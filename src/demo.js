import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Button, 
  ButtonWhiteOutline, 
  ButtonWhite,
  Searchbar, 
  Checkbox, 
  ThemeSwitch,
  Select,
  Input,
  Sidebar,
  Modal,
  CustomTab,
  ToolTip,
  VirtualizedTable,
  VirtualizedTableSC
} from './index';
import Queue from './Images/Queue.svg';
import queue_Dark from './Images/Queue_Dark.svg';
import { BrowserRouter } from 'react-router-dom';
import { Tab } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

const Demo = () => {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(true);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);

  const mockList = [
    { name: 'Dashboard', to: '/', icon: [Queue, queue_Dark], locations: [''] },
    { name: 'Processor', to: '/processor', icon: [Queue, queue_Dark], locations: ['processors'] },
    { name: 'Document Types', to: '/documenttypes', icon: [Queue, queue_Dark], locations: ['documenttypes'] },
    { name: 'Fields', to: '/fields', icon: [Queue, queue_Dark], locations: ['fields'] },
    { name: 'Upload', to: '/upload', icon: [Queue, queue_Dark], locations: ['upload'] },
    // Add more mock items as needed
  ];
  const mockData = [
    [
        "QueueCDS",
        38,
        53,
        2,
        "queuecds",
        [
            "Broker Invoice",
            "Accountant Verification",
            "Broker Fee Invoice",
            "Down payment waiver letter",
            "Vendor Approval",
            "Amortization Schedule",
            "Balance Sheet",
            "Bill of Sale",
            "PayNet Group",
            "Credit Approval",
            "Void",
            "NVIS",
            "Vehicle Registration",
            "PayNet",
            "Wire Info",
            "CPA Confirmation",
            "COI",
            "Wire Confirmation",
            "PPSA",
            "Lease Schedule",
            "Vendor Invoice",
            "Lessee Insurance Undertaking",
            "PAD Agreement",
            "Equipment Acceptance Certificate",
            "ID",
            "Corp Search Group",
            "Financial Statement",
            "Master Lease Agreement",
            "Certificate of Corporate Secretary",
            "Audit Checklist",
            "Bank Draft",
            "Assessment Roll Report",
            "Customer Identification Verification Form",
            "Corporate Profile",
            "Equifax Commercial Report",
            "Spec Sheet",
            "Business credit report",
            "Credit Application"
        ],
        [
            "giyebefiteradevcom",
            "Kesala"
        ],
        null,
        true,
        true,
        208,
        3
    ],
    [
        "Queue Test",
        19,
        18,
        1,
        "queue_salo",
        [
            "Credit Approval",
            "PayNet",
            "Corp Search",
            "NVIS",
            "Amortization Schedule",
            "Wire Confirmation",
            "Credit Application",
            "Vendor Invoice",
            "Audit Checklist",
            "Broker Invoice",
            "Executed MLA",
            "COI",
            "Executed Docs",
            "ID",
            "Wire Info",
            "Void",
            "Vendor Approval",
            "PPSA",
            "Lease Schedule"
        ],
        [
            "giyebefiteradevcom"
        ],
        null,
        true,
        true,
        112,
        3
    ],
    [
        "lease schedule",
        1,
        0,
        1,
        "lease_schedule",
        [
            "Lease Schedule"
        ],
        [
            "giyebefiteradevcom"
        ],
        null,
        true,
        false,
        0,
        3
    ],
    [
        "Fake Test",
        19,
        0,
        0,
        "fake_test",
        [
            "Credit Approval",
            "PayNet",
            "Corp Search",
            "NVIS",
            "Amortization Schedule",
            "Wire Confirmation",
            "Vendor Invoice",
            "Audit Checklist",
            "Broker Invoice",
            "Executed MLA",
            "COI",
            "Executed Docs",
            "ID",
            "Wire Info",
            "Void",
            "Due Diligence",
            "Vendor Approval",
            "PPSA",
            "Lease Schedule"
        ],
        [],
        null,
        true,
        false,
        0,
        3
    ],
    [
        "Tricor",
        17,
        47,
        2,
        "tricor",
        [
            "Consent to use of Personal Information",
            "Lease Agreement",
            "VOID",
            "Direction to Agent and Agent Confirmation of insurance",
            "SCF No1 Lessee Insurance Undertaking",
            "Equifax Consumer Credit Report",
            "Bill of Sale",
            "Customer Identification Verification Form",
            "Dealer Guarantee",
            "Corporate Profile",
            "Purchase Agreement",
            "PPSA registration",
            "Vehicle Registration",
            "Factory Invoice",
            "Credit Approval",
            "Equifax Business Credit Report",
            "Confirmation of Insurance"
        ],
        [
            "giyebefiteradevcom",
            "Gayu"
        ],
        null,
        false,
        true,
        112,
        4
    ],
    [
        "Testing",
        9,
        2,
        1,
        "testing",
        [
            "Consent to use of Personal Information",
            "VOID",
            "Customer Identification Verification Form",
            "Corporate Profile",
            "Purchase Agreement",
            "Government issued ID",
            "PPSA registration",
            "SCF No1 Lessee Insurance Undertaking",
            "Confirmation of Insurance"
        ],
        [
            "giyebefiteradevcom"
        ],
        null,
        false,
        false,
        80,
        3
    ],
    [
        "Dynamic Lease",
        38,
        17,
        1,
        "dynamic_lease",
        [
            "Equifax Commercial Report",
            "PPSA Registration",
            "CPA Confirmation",
            "Letter of Direction",
            "COI",
            "Audit Checklist",
            "Spec Sheet",
            "Credit Application",
            "Void",
            "Accountant Verification",
            "Vendor Approval",
            "Lessee Insurance Undertaking",
            "Waiver",
            "Amortization Schedule",
            "NVIS (New Vehicle Information Statement)",
            "Business credit report",
            "PayNet",
            "Corporate Profile",
            "Certificate of Corporate Secretary",
            "Credit Approval",
            "Financial Statement",
            "Wire Confirmation",
            "SN Search",
            "Wire Info",
            "Assessment Roll Report",
            "Down payment waiver letter",
            "Master Lease Agreement",
            "Vehicle Registration",
            "ID",
            "Corp Search Group",
            "PayNet Group",
            "PAD Agreement",
            "Broker Invoice",
            "Equipment Acceptance Certificate",
            "Debtor Search",
            "Lease Schedule",
            "Vendor Invoice",
            "Balance Sheet"
        ],
        [
            "giyebefiteradevcom"
        ],
        null,
        true,
        true,
        28,
        3
    ],
    [
        "Tricor Loan",
        11,
        8,
        1,
        "tricor_loan",
        [
            "Authorized Signature for the business",
            "PPSA Registration",
            "Consent to use of Personal Information",
            "Dealer Guarantee",
            "Corporate Profile",
            "Invoice",
            "Business Customer Identification",
            "Change in Payment Frequency",
            "Customer Identification Verification Form",
            "Credit Approval",
            "Loan(conditional sale agreement)"
        ],
        [
            "giyebefiteradevcom"
        ],
        null,
        false,
        true,
        11,
        4
    ],
    [
        "Test",
        5,
        0,
        1,
        "test",
        [
            "Credit Approval",
            "Amortization Schedule",
            "Credit Application",
            "ID",
            "PPSA"
        ],
        [
            "Gayu"
        ],
        null,
        false,
        false,
        0,
        3
    ],
    [
        "QueueABC",
        4,
        0,
        1,
        "queueabc",
        [
            "Credit Approval",
            "COI",
            "ID",
            "PPSA"
        ],
        [
            "giyebefiteradevcom"
        ],
        null,
        false,
        false,
        0,
        3
    ],
    [
        "dummy",
        0,
        0,
        0,
        "dummy",
        [],
        [],
        null,
        false,
        false,
        0,
        4
    ],
    [
        "RuleTransfer",
        0,
        0,
        0,
        "ruletransfer",
        [],
        [],
        null,
        false,
        true,
        0,
        3
    ]
];
  const columns = [
    {
      name: "Sr. No",
      label: "Sr. No",
      options: {
        setCellProps: () => ({
          style: {
            width: "90px",
          },
        }),
        customBodyRender: (value, tableMeta, updateValue) => {
          return <span>{tableMeta.rowIndex + 1}</span>;
        },
      },
    },
    {
      name: "Queues",
      label: (
        <div className="d-flex align-items-center">
          <span>Queues</span>
          <FilterListIcon 
            fontSize="small" 
            style={{ marginLeft: '5px', cursor: 'pointer'}} 
          />        
        </div>
      ),
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          console.log(tableMeta, "tableMetaquqwert");
          return (
            <>
              <div
                className='tabel-link'
              >
                <span className='blue'>{tableMeta.rowData[0]}</span>
              </div>
            </>
          );
        },
      },
    },
    {
      name: "Batches",
      label: (
        <div className="d-flex align-items-center">
          <span>Batches</span>
          <FilterListIcon 
            fontSize="small" 
            style={{ marginLeft: '5px', cursor: 'pointer' }} 
          />        
        </div>
      ),
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <span>{tableMeta.rowData[2]}</span>;
        },
      },
    },
    {
      name: "Folders",
      label: (
        <div className="d-flex align-items-center">
          <span>Folders</span>
          <FilterListIcon 
            fontSize="small" 
            style={{ marginLeft: '5px', cursor: 'pointer' }}
          />        
        </div>
      ),
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <span>{tableMeta.rowData[10]}</span>; //need API Changes
        },
      },
    },
    {
      name: "Processors",
      label: (
        <div className="d-flex align-items-center">
          <span>Processors</span>
          <FilterListIcon 
            fontSize="small" 
            style={{ marginLeft: '5px', cursor: 'pointer' }} 
          />        
        </div>
      ),
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          console.log(tableMeta, "tableMetaquqwert");
          return (
                <span>{tableMeta.rowData[0]}</span>
          );
        },
      },
    },
    {
      name: "Document Types",
      customWidth: 175,
      label: (
        <div className="d-flex align-items-center">
          <span>Document Types</span>
          <FilterListIcon 
            fontSize="small" 
            style={{ marginLeft: '5px', cursor: 'pointer' }}
          />        
        </div>
      ),
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          console.log(tableMeta, "tableMetaquqwert");
          return (
                <span>{tableMeta.rowData[0]}</span>
          );
        },
      },
    },
    {
      name: "Batches",
      label: (
        <div className="d-flex align-items-center">
          <span>Batches</span>
          <FilterListIcon 
            fontSize="small" 
            style={{ marginLeft: '5px', cursor: 'pointer' }} 
          />        
        </div>
      ),
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <span>{tableMeta.rowData[2]}</span>;
        },
      },
    },
    {
      name: "Folders",
      label: (
        <div className="d-flex align-items-center">
          <span>Folders</span>
          <FilterListIcon 
            fontSize="small" 
            style={{ marginLeft: '5px', cursor: 'pointer' }}
          />        
        </div>
      ),
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <span>{tableMeta.rowData[10]}</span>; //need API Changes
        },
      },
    },
    {
      name: "Processors",
      label: (
        <div className="d-flex align-items-center">
          <span>Processors</span>
          <FilterListIcon 
            fontSize="small" 
            style={{ marginLeft: '5px', cursor: 'pointer' }} 
          />        
        </div>
      ),
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          console.log(tableMeta, "tableMetaquqwert");
          return (
                <span>{tableMeta.rowData[0]}</span>
          );
        },
      },
    },
    {
      name: "Document Types",
      customWidth: 175,
      label: (
        <div className="d-flex align-items-center">
          <span>Document Types</span>
          <FilterListIcon 
            fontSize="small" 
            style={{ marginLeft: '5px', cursor: 'pointer' }}
          />        
        </div>
      ),
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          console.log(tableMeta, "tableMetaquqwert");
          return (
                <span>{tableMeta.rowData[0]}</span>
          );
        },
      },
    },
    {
      name: "Batches",
      label: (
        <div className="d-flex align-items-center">
          <span>Batches</span>
          <FilterListIcon 
            fontSize="small" 
            style={{ marginLeft: '5px', cursor: 'pointer' }} 
          />        
        </div>
      ),
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <span>{tableMeta.rowData[2]}</span>;
        },
      },
    },
    {
      name: "Folders",
      label: (
        <div className="d-flex align-items-center">
          <span>Folders</span>
          <FilterListIcon 
            fontSize="small" 
            style={{ marginLeft: '5px', cursor: 'pointer' }}
          />        
        </div>
      ),
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <span>{tableMeta.rowData[10]}</span>; //need API Changes
        },
      },
    },
    {
      name: "Processors",
      label: (
        <div className="d-flex align-items-center">
          <span>Processors</span>
          <FilterListIcon 
            fontSize="small" 
            style={{ marginLeft: '5px', cursor: 'pointer' }} 
          />        
        </div>
      ),
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          console.log(tableMeta, "tableMetaquqwert");
          return (
                <span>{tableMeta.rowData[0]}</span>
          );
        },
      },
    },
    {
      name: "Document Types",
      customWidth: 175,
      label: (
        <div className="d-flex align-items-center">
          <span>Document Types</span>
          <FilterListIcon 
            fontSize="small" 
            style={{ marginLeft: '5px', cursor: 'pointer' }}
          />        
        </div>
      ),
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          console.log(tableMeta, "tableMetaquqwert");
          return (
                <span>{tableMeta.rowData[0]}</span>
          );
        },
      },
    },
  ];

  const mockLogout = () => {
    console.log('Logout clicked');
  };
  const helpFn = () => {
    window.open('https://finance.in-d.ai/', '_blank');
  };

  return (
    <BrowserRouter>
      {/* <div style={{ marginBottom: '0px', width: '200px' }}>
        <Sidebar 
          list={mockList} 
          name="user_name" 
          logout={mockLogout} 
          poweredBy={true}
          helpFn={helpFn}
        />
      </div> */}
      <div style={{ padding: '20px', fontFamily: 'Mulish' }}>
        <h1>Intain Components</h1>
        
        <div style={{ marginBottom: '10px', display: 'flex', gap: '10px' }}>
          <Button  name='Sign in' />
          <Button  name='Sign in' disabled={true}/>
        </div>
        <div style={{ marginBottom: '10px', display: 'flex', gap: '10px' }}>
          <ButtonWhiteOutline  name='Add Field' />
          <ButtonWhiteOutline  name='Add Field' disabled={true}/>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <Searchbar name='Search Queues'/>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <h3>Checkbox Examples:</h3>
          
          <div style={{ marginBottom: '10px' }}>
            <Checkbox 
              checked={checked1}
              onChange={(e) => setChecked1(e.target.checked)}
            />
            <span style={{ marginLeft: '8px' }}>
              Unchecked by default (Current: {checked1 ? 'Checked' : 'Unchecked'})
            </span>
          </div>

          <div style={{ marginBottom: '10px' }}>
            <Checkbox 
              checked={checked2}
              onChange={(e) => setChecked2(e.target.checked)}
            />
            <span style={{ marginLeft: '8px' }}>
              Checked by default (Current: {checked2 ? 'Checked' : 'Unchecked'})
            </span>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <Checkbox 
              checked={true}
              disabled={true}
            />
            <span style={{ marginLeft: '8px' }}>
              disabled checkbox
            </span>
          </div>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <ThemeSwitch isDarkMode={true} toggleTheme={() => {}} />
        </div>
        <div style={{ marginBottom: '10px', width: '400px' }}>
          <Select placeholder='Select' options={[{value: 'admin', label: 'Admin'}, {value: 'processor', label: 'Processor'}]} error={false}/>
        </div>
        <div style={{ marginBottom: '10px', width: '200px' }}>
          <Select placeholder='Select' options={[{value: 'admin', label: 'Admin'}, {value: 'processor', label: 'Processor'}]} error={true}/>
        </div>
        <div style={{ marginBottom: '10px', width: '200px' }}>
          <Select disabled={true} placeholder='Select' options={[{value: 'admin', label: 'Admin'}, {value: 'processor', label: 'Processor'}]} error={false}/>
        </div>
        <div style={{ marginBottom: '10px', width: '200px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Input placeholder='Input' error={false} disabled={false} type='text'/>
          <Input placeholder='Input' error={true} disabled={false} type='text'/>
          <Input placeholder='Input' error={false} disabled={true} type='text'/>
        </div>
        <div style={{ marginBottom: '10px', width: '200px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Input placeholder='Input' error={false} disabled={false} type='password' showPassword={true}/>
          <Input placeholder='Input' error={true} disabled={false} type='password' showPassword={false}/>
          <Input placeholder='Input' error={false} disabled={true} type='password' showPassword={false}/>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <Button name='Open Popup' onClick={() => setOpen(true)}/>
          <Modal width='30%' open={open} onCancel={() => setOpen(false)} title='Modal Title' footer={true} closeIcon={true} buttonWhiteName='Cancel' buttonName='save'>
            <div>
              <label>Modal Content</label>
              <Input placeholder='Input' error={false} disabled={false} type='text'/>
            </div>
            <div>
              <label>Modal Content</label>
              <Select placeholder='Select' options={[{value: 'admin', label: 'Admin'}, {value: 'processor', label: 'Processor'}]} error={false}/>
            </div>
          </Modal>
        </div>
        <div style={{ marginBottom: '10px', width: '200px' }}>
          <ToolTip title='Tooltip Title example'>
            <h6>Hover me for tooltip</h6>
          </ToolTip>
        </div>
        <div style={{ marginBottom: '10px', width: '200px' }}>
          <CustomTab 
            value={value} 
            handleChange={(e, newValue) => setValue(newValue)} 
            TabButton={["Review", "Pending", "Exported", "Deleted"]} 
            ariaLabel='wrapped label tabs example' 
            Tab={
              ["Review", "Pending", "Exported", "Deleted"].map(
              (label, index) => (
                <Tab
                  disableRipple
                  key={label}
                  className="processor_tab_label"
                  label={label}
                />
              )
            )}
            variant='scrollable' 
            scrollButtons={false} 
            className='custom-tab' 
            width='fit-content'
          />
        </div>
        {/* <div style={{ marginBottom: '10px', width: '100%' }}>
          <VirtualizedTable
            data={mockData}
            columns={columns}
            height={500}
            stickyColumns={2}
          />
        </div> */}
        <div style={{ marginBottom: '10px', width: '100%' }}>
          <VirtualizedTableSC
            data={mockData}
            columns={columns}
            height={500}
            stickyColumns={2}
            footerButton={true}
            footerButtonText='Add Rules'
            footerButtonOnClick={() => console.log('Add Rules')}
          />
        </div>
      </div>
    </BrowserRouter>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Demo />); 