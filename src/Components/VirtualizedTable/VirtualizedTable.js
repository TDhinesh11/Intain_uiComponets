import React, {useEffect, useMemo, useRef} from 'react';
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
const Row = React.memo(({ index, style, data, columns }) => {
  const rowData = data[index];
  console.log(columns, 'columns123456')
  return (
    <TableRow
      className={`virtualized-row-${index+1}`}
      style={{
        ...style,
        display: 'flex',
        width: 'fit-content',
        backgroundColor: index % 2 === 0 ? 'var(--table-even-row)' : 'inherit',
      }}
      key={index}
      hover
    >
      {columns.map((col, colIndex) => (
        <TableCell
          key={colIndex}
          style={{
            flex: colIndex === 0 ? '0 0 80px' : col.customWidth ? `0 0 ${col.customWidth}px` : 1, //`0 0 150px`,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            padding: '13px 0px 13px 30px',
            fontSize: '15px',
            marginRight: colIndex === columns.length - 1 ? "19px" : "0px",
            //width: col.customWidth ?? 'auto', // 👈 use customWidth if provided
            minWidth: colIndex === 0 ? '80px' : '150px',
          }}
        >
          {col.options?.customBodyRender
            ? col.options.customBodyRender(rowData[col.name], {
                rowIndex: index,
                rowData,
              })
            : rowData[col.name]}
        </TableCell>
      ))}
    </TableRow>
  );
});

const VirtualizedTable = ({
  data = [],
  columns = [],
  height = 600,
  width,
  rowHeight = 50,
  pathname = '/',
  loading,
  loaderMsg = '',
  stickyColumns = 0,
}) => {
  const isLoading = loading;
  const finalHeight = pathname === '/datacheck' ? height - 100 : height - 42;
  const theme = useMemo(() => getMuiTheme(pathname), [pathname]);

  const scrollContainerRef = useRef(null);
  const headerRef = useRef(null);
  const listRef = useRef(null);

  const totalTableWidth = useMemo(() => {
    return columns.reduce((sum, col) => sum + (col.customWidth || 150), 0);
  }, [columns]);

  // Set up scroll synchronization
  useEffect(() => {
    const listElement = listRef.current;
    if (!listElement) return;

    const handleScroll = (e) => {
      const scrollLeft = e.target.scrollLeft;
      if (headerRef.current) {
        headerRef.current.scrollLeft = scrollLeft;
      }
    };

    // Get the actual scrollable div inside react-window
    const scrollableDiv = listElement._outerRef;
    if (scrollableDiv) {
      scrollableDiv.addEventListener('scroll', handleScroll);
      return () => {
        scrollableDiv.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  // ✅ Memoized renderer function
  const itemRenderer = useMemo(() => {
    return ({ index, style }) => (
      <Row
        index={index}
        style={style}
        data={data}
        columns={columns}
      />
    );
  }, [data, columns]);

  if (isLoading || data.length === 0) {
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
                {isLoading ? <Loader msg={loaderMsg} /> : <div className='no-data-text' style={{color: 'var(--text-color)'}}>Sorry, there is no matching data to display</div>}
              </div>
            </TableBody>
            {pathname === '/datacheck' && (
              <div className="table-footer">
                <ButtonWhiteOutline onClick={() => {}} name="Add Rules"/>
              </div>
            )}
          </Table>
        </TableContainer>
      </ThemeProvider>
    );
  }

  console.log(scrollContainerRef, 'totalTableWidth')
  
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
        <div style={{ width: `${Math.max(totalTableWidth, 100)}px` }}>
          <Table>
            <TableHead>
              <TableRow style={{ display: "flex", width: "100%", height: "40px" }}>
                {columns.map((col, idx) => (
                  <TableCell
                    key={idx}
                    onClick={() => col.options?.customHeadRender && col.options.customHeadRender()}
                    style={{
                      flex: idx === 0 ? "0 0 80px" : col.customWidth ? `0 0 ${col.customWidth}px` : `0 0 150px`, //1,
                      fontWeight: 600,
                      padding: "10px 0px 10px 30px",
                      marginRight: idx === columns.length - 1 ? "25px" : "0px",
                      fontSize: "15px",
                      backgroundColor: "var(--tabel-header)",
                      position: "sticky",
                      top: 0,
                      zIndex: 2,
                      color: "var(--text-color)",
                      cursor: col.options?.customHeadRender ? 'pointer' : 'default',
                      minWidth: idx === 0 ? '80px' : '150px',
                    }}
                  >
                    {console.log(col, 'col')}
                    {col.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
          </Table>
        </div>
      </div>
      <div style={{ height: finalHeight }}>
        <List
          ref={listRef}
          className="virtualized-table-body-scroll"
          height={finalHeight}
          itemCount={data.length}
          itemSize={rowHeight}
          overscanCount={20}
          style={{overflow: 'auto'}}
        >
          {itemRenderer}
        </List>
      </div>
      {pathname === '/datacheck' && (
          <div className="table-footer">
            <ButtonWhiteOutline onClick={() => {}} name="Add Rules"/>
          </div>
      )}
    </TableContainer>
  </ThemeProvider>
  )
}

export default React.memo(VirtualizedTable);
