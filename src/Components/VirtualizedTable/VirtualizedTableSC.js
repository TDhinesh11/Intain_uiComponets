import React, {useEffect, useMemo, useRef, useState} from 'react';
import { FixedSizeList as List } from 'react-window';
import './VirtualizedTable.css';
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Paper,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import Loader from '../Loader/Loader';
import ButtonWhiteOutline from '../ButtonWhite/ButtonWhiteOutline';

// Custom MUI Theme
const getMuiTheme = (pathname = '/') =>
  createTheme({
    components: {
      MuiTableCell: {
        styleOverrides: {
          root: {
            fontFamily: 'Mulish',
            color: 'var(--table-body-text)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            borderBottom: 'none',
            padding: '13px 0px 13px 30px',
            fontSize: '15px',
          },
        },
      },
      MuiTableHead: {
        styleOverrides: {
          root: {
            backgroundColor: 'var(--tabel-header)',
            fontWeight: '600',
            fontSize: '15px',
            color: 'var(--text-color)',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            boxShadow: 'none',
          },
        },
      },
    },
  });

// ✅ Memoized Row Renderer
const Row = React.memo(({ index, style, data, columns, stickyColumns = 0, computedWidths, isOverflowing }) => {
  const rowData = data[index];
  
  return (
    <TableRow
      className={`virtualized-row-${index+1}`}
      style={{
        ...style,
        display: 'flex',
        width: isOverflowing ? 'fit-content' : '100%',
        backgroundColor: index % 2 === 0 ? 'var(--table-even-row)' : 'inherit',
      }}
      key={index}
      hover
    >
      {columns.map((col, colIndex) => {
        // Calculate left position for sticky columns
        let leftPosition = 0;
        if (colIndex < stickyColumns) {
          for (let i = 0; i < colIndex; i++) {
            leftPosition += computedWidths[i] ?? (i === 0 ? 80 : (columns[i].customWidth || 150));
          }
        }

        return (
          <TableCell
            key={colIndex}
            style={{
              flex: `0 0 ${computedWidths[colIndex]}px`,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              padding: '13px 0px 13px 30px',
              fontSize: '15px',
              marginRight: isOverflowing && colIndex === columns.length - 1 ? "19px" : "0px",
              minWidth: `${computedWidths[colIndex]}px`,
              ...(colIndex < stickyColumns && {
                position: 'sticky',
                left: `${leftPosition}px`,
                zIndex: 1,
                backgroundColor: index % 2 === 0 ? 'var(--table-even-row)' : 'var(--body-box-background)',
              }),
            }}
          >
            {col.options?.customBodyRender
              ? col.options.customBodyRender(rowData[col.name], {
                  rowIndex: index,
                  rowData,
                })
              : rowData[col.name]}
          </TableCell>
        );
      })}
    </TableRow>
  );
});

const VirtualizedTableSC = ({
  data = [],
  columns = [],
  height = 600,
  width,
  rowHeight = 50,
  pathname = '/',
  loading,
  loaderMsg = '',
  stickyColumns = 0,
  footerButton,
  footerButtonText,
  footerButtonOnClick,
}) => {
  //const isLoading = loading;
  const shouldShowFooter = Boolean(footerButton) || pathname === '/datacheck';
  const finalHeight = shouldShowFooter ? height - 100 : height - 42;
  const theme = useMemo(() => getMuiTheme(pathname), [pathname]);

  const scrollContainerRef = useRef(null);
  const headerRef = useRef(null);
  const listRef = useRef(null);
  const listOuterRef = useRef(null);
  const [outerDivEl, setOuterDivEl] = useState(null);
  const [containerWidth, setContainerWidth] = useState(typeof width === 'number' ? width : 0);

  // Baseline width using 80px for first col and 150px (or customWidth) for others
  const baselineTableWidth = useMemo(() => {
    return columns.reduce((sum, col, idx) => {
      if (idx === 0) return sum + 80;
      return sum + (col.customWidth || 150);
    }, 0);
  }, [columns]);

  // Measure container width when not provided
  useEffect(() => {
    if (typeof width === 'number') {
      setContainerWidth(width);
      return;
    }
    const measure = () => {
      if (scrollContainerRef.current) {
        const w = scrollContainerRef.current.clientWidth;
        if (w && w !== containerWidth) setContainerWidth(w);
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [width, containerWidth, data, loading]);

  const isOverflowing = useMemo(() => {
    if (!containerWidth) return true; // default to overflow until measured
    return baselineTableWidth > containerWidth;
  }, [baselineTableWidth, containerWidth]);

  // Compute actual widths used for each column
  const computedWidths = useMemo(() => {
    const numCols = columns.length;
    if (numCols === 0) return [];
    if (isOverflowing) {
      return columns.map((col, idx) => (idx === 0 ? 80 : (col.customWidth || 150)));
    }
    const remainingCols = Math.max(numCols - 1, 1);
    const equalWidth = Math.max(0, Math.floor((containerWidth - 80) / remainingCols));
    return columns.map((_, idx) => (idx === 0 ? 80 : equalWidth));
  }, [columns, containerWidth, isOverflowing]);

  // Set up scroll synchronization (header <- horizontal scroll of list outer div)
  useEffect(() => {
    const scrollableDiv = outerDivEl;
    if (!scrollableDiv) return;

    const handleScroll = (e) => {
      const scrollLeft = e.target.scrollLeft;
      if (headerRef.current) {
        headerRef.current.scrollLeft = scrollLeft;
      }
    };

    scrollableDiv.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      scrollableDiv.removeEventListener('scroll', handleScroll);
    };
  }, [outerDivEl]);

  // ✅ Memoized renderer function
  const itemRenderer = useMemo(() => {
    return ({ index, style }) => (
      <Row
        index={index}
        style={style}
        data={data}
        columns={columns}
        stickyColumns={stickyColumns}
        computedWidths={computedWidths}
        isOverflowing={isOverflowing}
      />
    );
  }, [data, columns, stickyColumns, computedWidths, isOverflowing]);

  if (loading || data.length === 0) {
    return (
      <ThemeProvider theme={theme}>
        <TableContainer
          component={Paper}
          style={{
            height,
            border: '1px solid var(--body-box-border)',
            borderRadius: '10px',
            backgroundColor: 'var(--body-box-background)',
          }}
        >
          <Table stickyHeader style={{ tableLayout: 'fixed' }}>
            <TableHead>
              <TableRow style={{ display: 'flex', width: '100%', height: '40px' }}>
                {columns.map((col, idx) => (
                  <TableCell
                    key={idx}
                    style={{
                      flex: idx === 0 ? '0 0 80px' : 1,
                      fontWeight: 600,
                      padding: '10px 0px 10px 30px',
                      fontSize: '15px',
                      backgroundColor: 'var(--tabel-header)',
                      position: 'sticky',
                      top: 0,
                      zIndex: 2,
                      color: 'var(--text-color)',
                    }}
                  >
                    {col.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <div className="table-loader">
                {loading ? <Loader msg={loaderMsg} /> : <div className='no-data-text' style={{color: 'var(--text-color)'}}>Sorry, there is no matching data to display</div>}
              </div>
            </TableBody>
            {shouldShowFooter && (
              <div className="table-footer">
                <ButtonWhiteOutline onClick={() => footerButtonOnClick()} name={footerButtonText}/>
              </div>
            )}
          </Table>
        </TableContainer>
      </ThemeProvider>
    );
  }

  // console.log(scrollContainerRef, 'containerWidth', containerWidth)
  
  return (
    <ThemeProvider theme={theme}>
      <TableContainer
        component={Paper}
        ref={scrollContainerRef}
        style={{
          height,
          width,
          border: "1px solid var(--body-box-border)",
          borderRadius: "10px",
          backgroundColor: "var(--body-box-background)",
        }}
      >
        <div ref={headerRef} style={{ overflow: 'hidden', position: 'relative', zIndex: '3'}}>
          <div style={{ width: '100%' }}>
            <Table>
              <TableHead>
                <TableRow style={{ display: "flex", width: "100%", height: "40px" }}>
                  {columns.map((col, idx) => {
                    // Calculate left position for sticky header columns
                    let leftPosition = 0;
                    if (idx < stickyColumns) {
                      for (let i = 0; i < idx; i++) {
                        leftPosition += computedWidths[i] ?? (i === 0 ? 80 : (columns[i].customWidth || 150));
                      }
                    }

                    return (
                      <TableCell
                        key={idx}
                        onClick={() => col.options?.customHeadRender && col.options.customHeadRender()}
                        style={{
                          flex: `0 0 ${computedWidths[idx]}px`,
                          fontWeight: 600,
                          padding: "10px 0px 10px 30px",
                          marginRight: isOverflowing && idx === columns.length - 1 ? "25px" : "0px",
                          fontSize: "15px",
                          backgroundColor: "var(--tabel-header)",
                          position: "sticky",
                          top: 0,
                          zIndex: 2,
                          color: "var(--text-color)",
                          cursor: col.options?.customHeadRender ? 'pointer' : 'default',
                          minWidth: `${computedWidths[idx]}px`,
                          ...(idx < stickyColumns && {
                            left: `${leftPosition}px`,
                            zIndex: 3,
                          }),
                        }}
                      >
                        {col.label}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
            </Table>
          </div>
        </div>
        <div style={{ height: finalHeight }}>
          <List
            ref={listRef}
            outerRef={(el) => {
              listOuterRef.current = el;
              setOuterDivEl(el);
            }}
            className="virtualized-table-body-scroll"
            height={finalHeight}
            itemCount={data.length}
            itemSize={rowHeight}
            overscanCount={20}
            style={{overflowX: isOverflowing ? 'auto' : 'hidden', overflowY: 'auto'}}
          >
            {itemRenderer}
          </List>
        </div>
        {shouldShowFooter && (
          <div className="table-footer">
            <ButtonWhiteOutline btnWidth="fit-content" onClick={() => footerButtonOnClick()} name={footerButtonText} />
          </div>
        )}
      </TableContainer>
    </ThemeProvider>
  )
}

export default React.memo(VirtualizedTableSC);

/*
Detailed notes for VirtualizedTableSC
------------------------------------
Purpose
- High-performance, virtualized data table using react-window and MUI.
- Supports sticky columns and a dynamic column-sizing strategy that fills the table width when possible.

Key props
- data: Array<object>
  The row dataset. Each row object is accessed by column.name.
- columns: Array<{ name: string, label: string, customWidth?: number, options?: { customBodyRender?: (value, { rowIndex, rowData }) => ReactNode, customHeadRender?: () => void } }>
  Column definitions. First column is always 80px. Remaining columns are computed dynamically (see Sizing below).
- height: number
  Outer container height. Body area height is adjusted via finalHeight and used by react-window.
- width: number | undefined
  If provided, used to determine whether the table overflows horizontally. If not provided, the component measures the container width via ref.
- rowHeight: number
  Height of each virtualized row for react-window.
- pathname: string
  Used to slightly alter available height (e.g. '/datacheck').
- loading: boolean
  Shows Loader or empty-state when true or when there is no data.
- loaderMsg: string
  Message shown by Loader.
- stickyColumns: number
  Number of leading columns that remain sticky when horizontally scrolling.

Sizing strategy
- Baseline width: 80px for column 0, 150px (or customWidth) for all other columns.
- We measure the container width (or use the width prop if numeric) and decide:
  - Overflowing (baselineTableWidth > containerWidth):
    Use fixed widths: [80, 150|custom, 150|custom, ...]. The body/rows use width: 'fit-content' so horizontal scroll is enabled.
  - Not overflowing: 
    Distribute remaining width equally among columns 2..N so the table fills the container. Equal width is floor((containerWidth - 80) / (numCols - 1)). Rows use width: '100%'.
- The computed widths are stored in computedWidths and are applied to both header and body cells via flex-basis and minWidth.

Sticky columns
- For header and body, the left offset of a sticky column is the sum of computedWidths for all prior columns, ensuring correct alignment whether columns are fixed or equal-width.

Scroll synchronization
- The react-window outer scroll container emits 'scroll' events; we copy its scrollLeft to the header container to keep header and body columns aligned.

Virtualization
- The List from react-window renders only visible rows using a memoized Row component, greatly improving performance for large datasets.

Render fallbacks
- When loading or when there is no data, a basic table shell with headers is rendered along with a Loader or empty-data message.

Usage example
  const columns = [
    { name: 'srNo', label: 'Sr. No' },
    { name: 'queue', label: 'Queues' },
    { name: 'batches', label: 'Batches' },
    // ...more columns
  ];

  <VirtualizedTableSC
    data={rows}
    columns={columns}
    height={600}
    width={1200} // optional; if omitted, the component measures its container width
    rowHeight={50}
    stickyColumns={1}
    loading={false}
  />

Dev commands
- npm run dev   // start dev server
- npm run build // build library output
*/