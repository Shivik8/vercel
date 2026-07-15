#!/usr/bin/env python3
"""Generate the complete invoiceData.js file for SAP VIM PO Invoice Processing."""
import os

OUTPUT_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'invoiceData.js')

content = r'''// =============================================================================
// SAP VIM PO Invoice Processing - Tata Power Invoice Data
// Complete data model for the invoice processing workflow
// =============================================================================

export const invoices = [
  {
    id: '5100034385', companyCode: '1000', scanLocation: 'PR01-PAREL', parkedBy: '213293', invoiceType: 'ZSPO_GB_TP',
    vendorNum: '100012401', vendorName: 'AFOOZO PVT LTD', creationDate: '01.07.2026', amount: 75230.00, status: 'Pending',
    docType: 'RE', fiscalYear: '2027', headerText: '100001702330', refDoc: 'TPCL/26-27/28', purchaseDoc: '8200231868',
    invoiceDate: '25.06.2026', postingDate: '01.07.2026',
    taxAmount: 11475.76, taxCode: 'V1', taxDescription: 'Domestic Non Setoff',
    baseAmount: 63754.24,
    vendorGSTIN: '27AABCA7812J1ZQ', companyGSTIN: '27AAACT0054A1Z1',
    hsnCode: '854411', supplyDate: '25.06.2026',
    paymentTerms: '30 Days net', paymentTermCode: 'P30', baselineDt: '20.06.2026', dueOn: '20.07.2026',
    text: 'SUPPLY OF ELEC MATRL FOR DISTRIBUTION',
    businessPlace: '1001 / 1001', balance: 0.00,
    bgApplicable: true, bgPercent: 10, retentionSafetyPercent: 2.5,
    ldApplicable: false, ldSla: '2 No-LD',
    sesApproved: true, sesDate: '20.06.2026', deliveryDate: '15.08.2026',
  },
  {
    id: '5100034388', companyCode: '1000', scanLocation: 'DH06-DHARAVI', parkedBy: 'SAP_WFRT', invoiceType: 'ZSPO_GB_TP',
    vendorNum: '100015200', vendorName: 'AKANKSHA INFRACOM PVT LTD', creationDate: '01.07.2026', amount: 108555.33, status: 'In Review',
    docType: 'RE', fiscalYear: '2027', headerText: '100001702335', refDoc: 'TPCL/26-27/32', purchaseDoc: '8200231872',
    invoiceDate: '26.06.2026', postingDate: '01.07.2026',
    taxAmount: 16559.29, taxCode: 'G1', taxDescription: 'Domestic Non Setoff',
    baseAmount: 91996.04,
    vendorGSTIN: '27AADCA2835K1ZP', companyGSTIN: '27AAACT0054A1Z1',
    hsnCode: '998433', supplyDate: '26.06.2026',
    paymentTerms: '45 Days net', paymentTermCode: 'P45', baselineDt: '19.06.2026', dueOn: '03.08.2026',
    text: 'ATTND CBL FAULT BY EXCAVN TRENCH<=10M',
    businessPlace: '1001 / 1001', balance: 0.03,
    bgApplicable: true, bgPercent: 10, retentionSafetyPercent: 2.5,
    ldApplicable: true, ldSla: '1 Yes-LD',
    sesApproved: true, sesDate: '19.06.2026', deliveryDate: '18.08.2026',
  },
  {
    id: '5100034389', companyCode: '1000', scanLocation: 'DH06-DHARAVI', parkedBy: 'SAP_WFRT', invoiceType: 'ZSPO_GB_TP',
    vendorNum: '100015200', vendorName: 'AKANKSHA INFRACOM PVT LTD', creationDate: '30.06.2026', amount: 94320.50, status: 'Pending',
    docType: 'RE', fiscalYear: '2027', headerText: '100001702336', refDoc: 'TPCL/26-27/33', purchaseDoc: '8200231873',
    invoiceDate: '24.06.2026', postingDate: '30.06.2026',
    taxAmount: 14387.87, taxCode: 'G1', taxDescription: 'Domestic Non Setoff',
    baseAmount: 79932.63,
    vendorGSTIN: '27AADCA2835K1ZP', companyGSTIN: '27AAACT0054A1Z1',
    hsnCode: '998433', supplyDate: '24.06.2026',
    paymentTerms: '45 Days net', paymentTermCode: 'P45', baselineDt: '18.06.2026', dueOn: '02.08.2026',
    text: 'ATTND CBL FAULT BY EXCAVN TRENCH>10M',
    businessPlace: '1001 / 1001', balance: 0.00,
    bgApplicable: true, bgPercent: 10, retentionSafetyPercent: 2.5,
    ldApplicable: true, ldSla: '1 Yes-LD',
    sesApproved: true, sesDate: '18.06.2026', deliveryDate: '18.08.2026',
  },
  {
    id: '5100034390', companyCode: '1000', scanLocation: 'DH06-DHARAVI', parkedBy: 'SAP_WFRT', invoiceType: 'ZSPO_GB_TP',
    vendorNum: '100017292', vendorName: 'DAKSH ENGINEERING CO.', creationDate: '30.06.2026', amount: 215780.00, status: 'Approved',
    docType: 'RE', fiscalYear: '2027', headerText: '100001702337', refDoc: 'TPCL/26-27/34', purchaseDoc: '8200231874',
    invoiceDate: '22.06.2026', postingDate: '30.06.2026',
    taxAmount: 32915.59, taxCode: 'G1', taxDescription: 'Domestic Non Setoff',
    baseAmount: 182864.41,
    vendorGSTIN: '27AABCD5623M1ZR', companyGSTIN: '27AAACT0054A1Z1',
    hsnCode: '998433', supplyDate: '22.06.2026',
    paymentTerms: '45 Days net', paymentTermCode: 'P45', baselineDt: '15.06.2026', dueOn: '30.07.2026',
    text: 'FABRICATION & ERECTION OF STEEL STRUCTURE',
    businessPlace: '1001 / 1001', balance: 0.00,
    bgApplicable: true, bgPercent: 10, retentionSafetyPercent: 2.5,
    ldApplicable: true, ldSla: '1 Yes-LD',
    sesApproved: true, sesDate: '15.06.2026', deliveryDate: '20.08.2026',
  },
  {
    id: '5100034391', companyCode: '1000', scanLocation: 'HO01-ADMINISTRATION', parkedBy: 'SAP_WFRT', invoiceType: 'ZSPO_GB_TP',
    vendorNum: '100017243', vendorName: 'Galaxy Buildcon', creationDate: '30.06.2026', amount: 342100.75, status: 'Pending',
    docType: 'RE', fiscalYear: '2027', headerText: '100001702338', refDoc: 'TPCL/26-27/35', purchaseDoc: '8200231875',
    invoiceDate: '20.06.2026', postingDate: '30.06.2026',
    taxAmount: 52184.01, taxCode: 'G1', taxDescription: 'Domestic Non Setoff',
    baseAmount: 289916.74,
    vendorGSTIN: '27AAECG3421N1ZS', companyGSTIN: '27AAACT0054A1Z1',
    hsnCode: '995423', supplyDate: '20.06.2026',
    paymentTerms: '60 Days net', paymentTermCode: 'P60', baselineDt: '12.06.2026', dueOn: '11.08.2026',
    text: 'CIVIL CONST WORK FOR SUBSTATION BLDG',
    businessPlace: '1001 / 1001', balance: 0.00,
    bgApplicable: true, bgPercent: 10, retentionSafetyPercent: 2.5,
    ldApplicable: true, ldSla: '1 Yes-LD',
    sesApproved: true, sesDate: '12.06.2026', deliveryDate: '25.08.2026',
  },
  {
    id: '5100034392', companyCode: '1000', scanLocation: 'DH06-DHARAVI', parkedBy: 'SAP_WFRT', invoiceType: 'ZSPO_GB_TP',
    vendorNum: '180007773', vendorName: 'HOLOFX CONSULTING PVT. LTD.', creationDate: '30.06.2026', amount: 58900.00, status: 'In Review',
    docType: 'RE', fiscalYear: '2027', headerText: '100001702339', refDoc: 'TPCL/26-27/36', purchaseDoc: '8200231876',
    invoiceDate: '28.06.2026', postingDate: '30.06.2026',
    taxAmount: 8984.75, taxCode: 'V1', taxDescription: 'Domestic Non Setoff',
    baseAmount: 49915.25,
    vendorGSTIN: '27AADCH7234P1ZT', companyGSTIN: '27AAACT0054A1Z1',
    hsnCode: '998314', supplyDate: '28.06.2026',
    paymentTerms: '30 Days net', paymentTermCode: 'P30', baselineDt: '25.06.2026', dueOn: '25.07.2026',
    text: 'IT CONSULTING - SAP VIM MODULE SUPPORT',
    businessPlace: '1004 / 1004', balance: 0.00,
    bgApplicable: false, bgPercent: 0, retentionSafetyPercent: 0,
    ldApplicable: false, ldSla: '2 No-LD',
    sesApproved: true, sesDate: '25.06.2026', deliveryDate: '30.07.2026',
  },
  {
    id: '5100034393', companyCode: '1000', scanLocation: 'HO01-ADMINISTRATION', parkedBy: 'SAP_WFRT', invoiceType: 'ZSPO_GB_TP',
    vendorNum: '180007773', vendorName: 'HOLOFX CONSULTING PVT. LTD.', creationDate: '30.06.2026', amount: 127450.25, status: 'Pending',
    docType: 'RE', fiscalYear: '2027', headerText: '100001702340', refDoc: 'TPCL/26-27/37', purchaseDoc: '8200231877',
    invoiceDate: '27.06.2026', postingDate: '30.06.2026',
    taxAmount: 19457.67, taxCode: 'V1', taxDescription: 'Domestic Non Setoff',
    baseAmount: 107992.58,
    vendorGSTIN: '27AADCH7234P1ZT', companyGSTIN: '27AAACT0054A1Z1',
    hsnCode: '998314', supplyDate: '27.06.2026',
    paymentTerms: '30 Days net', paymentTermCode: 'P30', baselineDt: '22.06.2026', dueOn: '22.07.2026',
    text: 'IT CONSULTING - SAP FICO MODULE SUPPORT',
    businessPlace: '1004 / 1004', balance: 0.00,
    bgApplicable: false, bgPercent: 0, retentionSafetyPercent: 0,
    ldApplicable: false, ldSla: '2 No-LD',
    sesApproved: true, sesDate: '22.06.2026', deliveryDate: '30.07.2026',
  },
  {
    id: '5100034394', companyCode: '1000', scanLocation: 'HO01-ADMINISTRATION', parkedBy: 'SAP_WFRT', invoiceType: 'ZSPO_GB_TP',
    vendorNum: '180007773', vendorName: 'HOLOFX CONSULTING PVT. LTD.', creationDate: '30.06.2026', amount: 89675.00, status: 'Approved',
    docType: 'RE', fiscalYear: '2027', headerText: '100001702341', refDoc: 'TPCL/26-27/38', purchaseDoc: '8200231878',
    invoiceDate: '26.06.2026', postingDate: '30.06.2026',
    taxAmount: 13679.24, taxCode: 'V1', taxDescription: 'Domestic Non Setoff',
    baseAmount: 75995.76,
    vendorGSTIN: '27AADCH7234P1ZT', companyGSTIN: '27AAACT0054A1Z1',
    hsnCode: '998314', supplyDate: '26.06.2026',
    paymentTerms: '30 Days net', paymentTermCode: 'P30', baselineDt: '20.06.2026', dueOn: '20.07.2026',
    text: 'IT CONSULTING - SAP MM MODULE SUPPORT',
    businessPlace: '1004 / 1004', balance: 0.00,
    bgApplicable: false, bgPercent: 0, retentionSafetyPercent: 0,
    ldApplicable: false, ldSla: '2 No-LD',
    sesApproved: true, sesDate: '20.06.2026', deliveryDate: '30.07.2026',
  },
  {
    id: '5100034395', companyCode: '1000', scanLocation: 'HO01-ADMINISTRATION', parkedBy: 'SAP_WFRT', invoiceType: 'ZSPO_GB_TP',
    vendorNum: '100007362', vendorName: 'KUMAR FABRICATORS', creationDate: '01.07.2026', amount: 456200.00, status: 'In Review',
    docType: 'RE', fiscalYear: '2027', headerText: '100001702342', refDoc: 'TPCL/26-27/39', purchaseDoc: '8200231879',
    invoiceDate: '28.06.2026', postingDate: '01.07.2026',
    taxAmount: 69589.83, taxCode: 'G1', taxDescription: 'Domestic Non Setoff',
    baseAmount: 386610.17,
    vendorGSTIN: '27AABCK4521Q1ZU', companyGSTIN: '27AAACT0054A1Z1',
    hsnCode: '731100', supplyDate: '28.06.2026',
    paymentTerms: '45 Days net', paymentTermCode: 'P45', baselineDt: '23.06.2026', dueOn: '07.08.2026',
    text: 'FABRICATION OF MS CABLE TRAY AND COVERS',
    businessPlace: '1001 / 1001', balance: 0.00,
    bgApplicable: true, bgPercent: 10, retentionSafetyPercent: 2.5,
    ldApplicable: true, ldSla: '1 Yes-LD',
    sesApproved: true, sesDate: '23.06.2026', deliveryDate: '22.08.2026',
  },
  {
    id: '5100034396', companyCode: '1000', scanLocation: 'HO01-ADMINISTRATION', parkedBy: 'SAP_WFRT', invoiceType: 'ZPO_GLB_TP',
    vendorNum: '100014594', vendorName: 'KYOCERA DOCUMENT SOLUTION', creationDate: '01.07.2026', amount: 34780.50, status: 'Pending',
    docType: 'RE', fiscalYear: '2027', headerText: '100001702343', refDoc: 'TPCL/26-27/40', purchaseDoc: '8200231880',
    invoiceDate: '29.06.2026', postingDate: '01.07.2026',
    taxAmount: 5305.50, taxCode: 'V1', taxDescription: 'Domestic Non Setoff',
    baseAmount: 29475.00,
    vendorGSTIN: '27AABCK8912R1ZV', companyGSTIN: '27AAACT0054A1Z1',
    hsnCode: '844399', supplyDate: '29.06.2026',
    paymentTerms: '30 Days net', paymentTermCode: 'P30', baselineDt: '25.06.2026', dueOn: '25.07.2026',
    text: 'SUPPLY OF PRINTER CARTRIDGE & SPARES',
    businessPlace: '1004 / 1004', balance: 0.00,
    bgApplicable: false, bgPercent: 0, retentionSafetyPercent: 0,
    ldApplicable: false, ldSla: '2 No-LD',
    sesApproved: true, sesDate: '25.06.2026', deliveryDate: '15.07.2026',
  },
  {
    id: '5100034397', companyCode: '1000', scanLocation: 'DH06-DHARAVI', parkedBy: 'SAP_WFRT', invoiceType: 'ZSPO_GB_TP',
    vendorNum: '100014896', vendorName: 'LAKHANI SREEJA ENGINEERING CO', creationDate: '01.07.2026', amount: 198340.00, status: 'Approved',
    docType: 'RE', fiscalYear: '2027', headerText: '100001702344', refDoc: 'TPCL/26-27/41', purchaseDoc: '8200231881',
    invoiceDate: '23.06.2026', postingDate: '01.07.2026',
    taxAmount: 30255.25, taxCode: 'G1', taxDescription: 'Domestic Non Setoff',
    baseAmount: 168084.75,
    vendorGSTIN: '27AABCL5623S1ZW', companyGSTIN: '27AAACT0054A1Z1',
    hsnCode: '854110', supplyDate: '23.06.2026',
    paymentTerms: '45 Days net', paymentTermCode: 'P45', baselineDt: '16.06.2026', dueOn: '31.07.2026',
    text: 'RMU INSTALLATION AND COMMISSIONING',
    businessPlace: '1001 / 1001', balance: 0.05,
    bgApplicable: true, bgPercent: 10, retentionSafetyPercent: 2.5,
    ldApplicable: true, ldSla: '1 Yes-LD',
    sesApproved: true, sesDate: '16.06.2026', deliveryDate: '20.08.2026',
  },
  {
    id: '5100034398', companyCode: '1000', scanLocation: 'DH06-DHARAVI', parkedBy: 'SAP_WFRT', invoiceType: 'ZSPO_GB_TP',
    vendorNum: '100014896', vendorName: 'LAKHANI SREEJA ENGINEERING CO', creationDate: '30.06.2026', amount: 67890.75, status: 'Pending',
    docType: 'RE', fiscalYear: '2027', headerText: '100001702345', refDoc: 'TPCL/26-27/42', purchaseDoc: '8200231882',
    invoiceDate: '21.06.2026', postingDate: '30.06.2026',
    taxAmount: 10356.22, taxCode: 'G1', taxDescription: 'Domestic Non Setoff',
    baseAmount: 57534.53,
    vendorGSTIN: '27AABCL5623S1ZW', companyGSTIN: '27AAACT0054A1Z1',
    hsnCode: '854449', supplyDate: '21.06.2026',
    paymentTerms: '45 Days net', paymentTermCode: 'P45', baselineDt: '14.06.2026', dueOn: '29.07.2026',
    text: 'CABLE LAYING 11KV XLPE CABLE',
    businessPlace: '1001 / 1001', balance: 0.00,
    bgApplicable: true, bgPercent: 10, retentionSafetyPercent: 2.5,
    ldApplicable: true, ldSla: '1 Yes-LD',
    sesApproved: true, sesDate: '14.06.2026', deliveryDate: '18.08.2026',
  },
  {
    id: '5100034399', companyCode: '1000', scanLocation: 'DH06-DHARAVI', parkedBy: 'SAP_WFRT', invoiceType: 'ZSPO_GB_TP',
    vendorNum: '180002881', vendorName: 'M POWER INDIA PRIVATE LIMITED', creationDate: '01.07.2026', amount: 523400.00, status: 'In Review',
    docType: 'RE', fiscalYear: '2027', headerText: '100001702346', refDoc: 'TPCL/26-27/43', purchaseDoc: '8200231883',
    invoiceDate: '27.06.2026', postingDate: '01.07.2026',
    taxAmount: 79840.68, taxCode: 'G1', taxDescription: 'Domestic Non Setoff',
    baseAmount: 443559.32,
    vendorGSTIN: '27AADCM3412T1ZX', companyGSTIN: '27AAACT0054A1Z1',
    hsnCode: '853710', supplyDate: '27.06.2026',
    paymentTerms: '60 Days net', paymentTermCode: 'P60', baselineDt: '20.06.2026', dueOn: '19.08.2026',
    text: 'HT SWITCHGEAR SUPPLY AND INSTALLATION',
    businessPlace: '1001 / 1001', balance: 0.00,
    bgApplicable: true, bgPercent: 10, retentionSafetyPercent: 2.5,
    ldApplicable: true, ldSla: '1 Yes-LD',
    sesApproved: true, sesDate: '20.06.2026', deliveryDate: '25.08.2026',
  },
  {
    id: '5100034400', companyCode: '1000', scanLocation: 'DH06-DHARAVI', parkedBy: 'SAP_WFRT', invoiceType: 'ZSPO_GB_TP',
    vendorNum: '180002881', vendorName: 'M POWER INDIA PRIVATE LIMITED', creationDate: '01.07.2026', amount: 145670.25, status: 'Pending',
    docType: 'RE', fiscalYear: '2027', headerText: '100001702347', refDoc: 'TPCL/26-27/44', purchaseDoc: '8200231884',
    invoiceDate: '25.06.2026', postingDate: '01.07.2026',
    taxAmount: 22220.89, taxCode: 'G1', taxDescription: 'Domestic Non Setoff',
    baseAmount: 123449.36,
    vendorGSTIN: '27AADCM3412T1ZX', companyGSTIN: '27AAACT0054A1Z1',
    hsnCode: '853710', supplyDate: '25.06.2026',
    paymentTerms: '60 Days net', paymentTermCode: 'P60', baselineDt: '18.06.2026', dueOn: '17.08.2026',
    text: 'LT PANEL SUPPLY AND INSTALLATION',
    businessPlace: '1001 / 1001', balance: 0.00,
    bgApplicable: true, bgPercent: 10, retentionSafetyPercent: 2.5,
    ldApplicable: true, ldSla: '1 Yes-LD',
    sesApproved: true, sesDate: '18.06.2026', deliveryDate: '25.08.2026',
  },
  {
    id: '5100034401', companyCode: '1000', scanLocation: 'DH06-DHARAVI', parkedBy: 'SAP_WFRT', invoiceType: 'ZSPO_GB_TP',
    vendorNum: '100006478', vendorName: 'NETCORE SOLUTIONS PVT. LTD.', creationDate: '30.06.2026', amount: 87650.00, status: 'Approved',
    docType: 'RE', fiscalYear: '2027', headerText: '100001702348', refDoc: 'TPCL/26-27/45', purchaseDoc: '8200231885',
    invoiceDate: '28.06.2026', postingDate: '30.06.2026',
    taxAmount: 13370.34, taxCode: 'V1', taxDescription: 'Domestic Non Setoff',
    baseAmount: 74279.66,
    vendorGSTIN: '27AABCN7234U1ZY', companyGSTIN: '27AAACT0054A1Z1',
    hsnCode: '998319', supplyDate: '28.06.2026',
    paymentTerms: '30 Days net', paymentTermCode: 'P30', baselineDt: '24.06.2026', dueOn: '24.07.2026',
    text: 'SMS GATEWAY SERVICE CHARGES - JUNE 2026',
    businessPlace: '1004 / 1004', balance: 0.00,
    bgApplicable: false, bgPercent: 0, retentionSafetyPercent: 0,
    ldApplicable: false, ldSla: '2 No-LD',
    sesApproved: true, sesDate: '24.06.2026', deliveryDate: '30.07.2026',
  },
  {
    id: '5100034402', companyCode: '1000', scanLocation: 'DH06-DHARAVI', parkedBy: 'SAP_WFRT', invoiceType: 'ZSPO_GB_TP',
    vendorNum: '100006478', vendorName: 'NETCORE SOLUTIONS PVT. LTD.', creationDate: '30.06.2026', amount: 265430.50, status: 'Pending',
    docType: 'RE', fiscalYear: '2027', headerText: '100001702349', refDoc: 'TPCL/26-27/46', purchaseDoc: '8200231886',
    invoiceDate: '27.06.2026', postingDate: '30.06.2026',
    taxAmount: 40488.55, taxCode: 'V1', taxDescription: 'Domestic Non Setoff',
    baseAmount: 224941.95,
    vendorGSTIN: '27AABCN7234U1ZY', companyGSTIN: '27AAACT0054A1Z1',
    hsnCode: '998319', supplyDate: '27.06.2026',
    paymentTerms: '30 Days net', paymentTermCode: 'P30', baselineDt: '22.06.2026', dueOn: '22.07.2026',
    text: 'EMAIL GATEWAY SERVICE CHARGES - Q1 FY27',
    businessPlace: '1004 / 1004', balance: 0.00,
    bgApplicable: false, bgPercent: 0, retentionSafetyPercent: 0,
    ldApplicable: false, ldSla: '2 No-LD',
    sesApproved: true, sesDate: '22.06.2026', deliveryDate: '30.07.2026',
  },
  {
    id: '5100034403', companyCode: '1000', scanLocation: 'TC01-TRANSMISSION CAPEX', parkedBy: 'SAP_WFRT', invoiceType: 'ZSPO_GB_TP',
    vendorNum: '100022473', vendorName: 'R.N.CABS PVT LTD', creationDate: '01.07.2026', amount: 156780.00, status: 'In Review',
    docType: 'RE', fiscalYear: '2027', headerText: '100001702350', refDoc: 'TPCL/26-27/47', purchaseDoc: '8200231887',
    invoiceDate: '29.06.2026', postingDate: '01.07.2026',
    taxAmount: 23915.59, taxCode: 'V1', taxDescription: 'Domestic Non Setoff',
    baseAmount: 132864.41,
    vendorGSTIN: '27AADCR4521V1ZZ', companyGSTIN: '27AAACT0054A1Z1',
    hsnCode: '996501', supplyDate: '29.06.2026',
    paymentTerms: '30 Days net', paymentTermCode: 'P30', baselineDt: '26.06.2026', dueOn: '26.07.2026',
    text: 'CAB HIRE CHARGES FOR SITE INSPECTION',
    businessPlace: '1002 / 1002', balance: 0.00,
    bgApplicable: false, bgPercent: 0, retentionSafetyPercent: 0,
    ldApplicable: false, ldSla: '2 No-LD',
    sesApproved: true, sesDate: '26.06.2026', deliveryDate: '31.07.2026',
  },
  {
    id: '5100034404', companyCode: '1000', scanLocation: 'TC01-TRANSMISSION CAPEX', parkedBy: 'SAP_WFRT', invoiceType: 'ZSPO_GB_TP',
    vendorNum: '100022473', vendorName: 'R.N.CABS PVT LTD', creationDate: '01.07.2026', amount: 412350.75, status: 'Pending',
    docType: 'RE', fiscalYear: '2027', headerText: '100001702351', refDoc: 'TPCL/26-27/48', purchaseDoc: '8200231888',
    invoiceDate: '30.06.2026', postingDate: '01.07.2026',
    taxAmount: 62900.96, taxCode: 'V1', taxDescription: 'Domestic Non Setoff',
    baseAmount: 349449.79,
    vendorGSTIN: '27AADCR4521V1ZZ', companyGSTIN: '27AAACT0054A1Z1',
    hsnCode: '996791', supplyDate: '30.06.2026',
    paymentTerms: '30 Days net', paymentTermCode: 'P30', baselineDt: '27.06.2026', dueOn: '27.07.2026',
    text: 'VEHICLE HIRE FOR MATERIAL TRANSPORT',
    businessPlace: '1002 / 1002', balance: 0.00,
    bgApplicable: false, bgPercent: 0, retentionSafetyPercent: 0,
    ldApplicable: false, ldSla: '2 No-LD',
    sesApproved: true, sesDate: '27.06.2026', deliveryDate: '31.07.2026',
  },
];
'''

content += r'''
// =============================================================================
// Vendor Master Data
// =============================================================================

export const vendorDetails = {
  '100015200': {
    vendorNumber: '100015200',
    vendorName: 'AKANKSHA INFRACOM PVT LTD',
    bankName: 'KARNATAKA BANK LTD',
    bankAccount: '0912000100387001',
    bankNumber: 'KARB0000876',
    street: 'OPPOSITE SAI LEELA HOTEL, GOREGAON WEST',
    postalCode: '400063',
    city: 'MUMBAI',
    country: 'IN',
    region: '13',
  },
  '100012401': {
    vendorNumber: '100012401',
    vendorName: 'AFOOZO PVT LTD',
    bankName: 'HDFC BANK LTD',
    bankAccount: '50200045678901',
    bankNumber: 'HDFC0001234',
    street: 'ANDHERI KURLA ROAD, ANDHERI EAST',
    postalCode: '400069',
    city: 'MUMBAI',
    country: 'IN',
    region: '13',
  },
  '100017292': {
    vendorNumber: '100017292',
    vendorName: 'DAKSH ENGINEERING CO.',
    bankName: 'STATE BANK OF INDIA',
    bankAccount: '38912456780012',
    bankNumber: 'SBIN0005678',
    street: 'INDUSTRIAL AREA, TURBHE MIDC',
    postalCode: '400705',
    city: 'NAVI MUMBAI',
    country: 'IN',
    region: '13',
  },
  '100017243': {
    vendorNumber: '100017243',
    vendorName: 'Galaxy Buildcon',
    bankName: 'ICICI BANK LTD',
    bankAccount: '012345678901234',
    bankNumber: 'ICIC0001234',
    street: 'LINK ROAD, MALAD WEST',
    postalCode: '400064',
    city: 'MUMBAI',
    country: 'IN',
    region: '13',
  },
  '180007773': {
    vendorNumber: '180007773',
    vendorName: 'HOLOFX CONSULTING PVT. LTD.',
    bankName: 'AXIS BANK LTD',
    bankAccount: '917020012345678',
    bankNumber: 'UTIB0002345',
    street: 'BKC, BANDRA EAST',
    postalCode: '400051',
    city: 'MUMBAI',
    country: 'IN',
    region: '13',
  },
  '100007362': {
    vendorNumber: '100007362',
    vendorName: 'KUMAR FABRICATORS',
    bankName: 'BANK OF BARODA',
    bankAccount: '33450200001234',
    bankNumber: 'BARB0TURBHE',
    street: 'PLOT 42, MIDC INDUSTRIAL AREA, TURBHE',
    postalCode: '400703',
    city: 'NAVI MUMBAI',
    country: 'IN',
    region: '13',
  },
  '100014594': {
    vendorNumber: '100014594',
    vendorName: 'KYOCERA DOCUMENT SOLUTION',
    bankName: 'DEUTSCHE BANK AG',
    bankAccount: '00278910045678',
    bankNumber: 'DEUT0784BBY',
    street: 'HIRANANDANI BUSINESS PARK, POWAI',
    postalCode: '400076',
    city: 'MUMBAI',
    country: 'IN',
    region: '13',
  },
  '100014896': {
    vendorNumber: '100014896',
    vendorName: 'LAKHANI SREEJA ENGINEERING CO',
    bankName: 'UNION BANK OF INDIA',
    bankAccount: '510101012345678',
    bankNumber: 'UBIN0531456',
    street: 'SHOP 14, INDUSTRIAL ESTATE, BHANDUP',
    postalCode: '400078',
    city: 'MUMBAI',
    country: 'IN',
    region: '13',
  },
  '180002881': {
    vendorNumber: '180002881',
    vendorName: 'M POWER INDIA PRIVATE LIMITED',
    bankName: 'KOTAK MAHINDRA BANK LTD',
    bankAccount: '2512789012345',
    bankNumber: 'KKBK0000234',
    street: 'ANDHERI KURLA ROAD, MAROL',
    postalCode: '400059',
    city: 'MUMBAI',
    country: 'IN',
    region: '13',
  },
  '100006478': {
    vendorNumber: '100006478',
    vendorName: 'NETCORE SOLUTIONS PVT. LTD.',
    bankName: 'YES BANK LTD',
    bankAccount: '002194600001234',
    bankNumber: 'YESB0000456',
    street: '8TH FLOOR, GODREJ BKC, BANDRA EAST',
    postalCode: '400051',
    city: 'MUMBAI',
    country: 'IN',
    region: '13',
  },
  '100022473': {
    vendorNumber: '100022473',
    vendorName: 'R.N.CABS PVT LTD',
    bankName: 'PUNJAB NATIONAL BANK',
    bankAccount: '0107000100456789',
    bankNumber: 'PUNB0107000',
    street: 'GOREGAON MULUND LINK ROAD, BHANDUP',
    postalCode: '400078',
    city: 'MUMBAI',
    country: 'IN',
    region: '13',
  },
};
'''

content += """
// =============================================================================
// Company / Recipient Data
// =============================================================================

export const recipientData = {
  companyCode: '1000',
  companyName: 'The Tata Power Co.',
  street: "Corporate Center, Block 'B'",
  postalCode: '400009',
  city: 'Mumbai',
  country: 'IN',
  region: '13',
};

// =============================================================================
// Process Options (Workflow Actions)
// =============================================================================

export const processOptions = [
  { option: 'Delete and Re-enter', description: 'Delete and Re-enter as PO invoice (PO Invoice)', receivingActor: 'PO_AP_PROC_TP' },
  { option: 'Refer', description: 'Refer to Info Provider', receivingActor: 'INFO_PROV_TP' },
  { option: 'Refer', description: 'Refer to PO Invoice AP Processor', receivingActor: 'PO_AP_PROC_TP' },
  { option: 'Refer', description: 'Refer to PO Invoice Requisitioner', receivingActor: 'REQUISI_TP' },
  { option: 'Change/Post (PO)', description: 'Change/Post Invoice (PO)', receivingActor: 'PO_AP_PROC_TP' },
  { option: 'Delete Invoice (PO)', description: 'Delete Invoice (PO)', receivingActor: 'PO_AP_PROC_TP' },
  { option: 'Refer Back', description: 'Refer Back', receivingActor: 'PO_AP_PROC_TP' },
];

// =============================================================================
// Workflow History
// =============================================================================

export const workflowHistory = [
  { date: '01.07.2026', time: '08:56:34', user: 'Arvind Hanumant Pophale (201427)', action: 'Changed', status: 'OK' },
  { date: '30.06.2026', time: '14:22:10', user: 'Parag Surve (213293)', action: 'Parked', status: 'OK' },
  { date: '30.06.2026', time: '11:05:45', user: 'System', action: 'Created', status: 'OK' },
];

// =============================================================================
// Sidebar Navigation Folders
// =============================================================================

export const sidebarFolders = [
  { name: 'Inbox', icon: 'inbox', children: [
    { name: 'Unread Documents', count: 0 },
    { name: 'Documents', count: 0 },
    { name: 'Workflow', count: 1682, children: [
      { name: 'Grouped according to task', children: [
        { name: 'DP Document Dashboard' },
        { name: 'Non-PO Invoice Dashboard' },
        { name: 'PO Invoice Dashboard (Line Level)' },
        { name: 'PO Parked Invoice Dashboard', active: true },
      ]},
      { name: 'Grouped according to content' },
      { name: 'Grouped according to content type' },
      { name: 'Grouped according to sort key' },
    ]},
    { name: 'Overdue entries', count: 0 },
    { name: 'Deadline Messages', count: 0 },
    { name: 'Entries with Errors', count: 0 },
  ]},
  { name: 'Outbox', icon: 'send' },
  { name: 'Resubmission', icon: 'clock' },
  { name: 'Private folders', icon: 'folder' },
  { name: 'Shared folders', icon: 'users' },
  { name: 'Subscribed Folders', icon: 'bookmark' },
  { name: 'Trash', icon: 'trash' },
  { name: 'Shared trash', icon: 'trash-2' },
];
"""

content += r'''
// =============================================================================
// Line Items (9 Service Entry Line Items for PO 8200231872)
// =============================================================================

export const lineItems = [
  { item: '001', poNumber: '8200231872', poItem: '00010', material: 'SERVICE', description: 'ATTND CBL FAULT BY EXCAVN TRENCH<=10M', quantity: 1, unit: 'AU', netPrice: 41085.00, currency: 'INR', taxCode: 'G1' },
  { item: '002', poNumber: '8200231872', poItem: '00010', material: 'SERVICE', description: 'EXCVTN IN ALL TYPES OF SOIL INCL MURM', quantity: 3.800, unit: 'M3', netPrice: 2412.81, currency: 'INR', taxCode: 'G1' },
  { item: '003', poNumber: '8200231872', poItem: '00010', material: 'SERVICE', description: 'LAYING OF CABLE THROUGH DUCT/PIPE', quantity: 8, unit: 'M', netPrice: 896.40, currency: 'INR', taxCode: 'G1' },
  { item: '004', poNumber: '8200231872', poItem: '00010', material: 'SERVICE', description: 'BACKFILLING EXCAVATED EARTH WITH SAND', quantity: 11400, unit: 'M3', netPrice: 1362.53, currency: 'INR', taxCode: 'G1' },
  { item: '005', poNumber: '8200231872', poItem: '00010', material: 'SERVICE', description: 'SUPPLY OF BAGS OF SAND FOR BACKFILLING', quantity: 400, unit: 'BAG', netPrice: 8964.00, currency: 'INR', taxCode: 'G1' },
  { item: '006', poNumber: '8200231872', poItem: '00010', material: 'SERVICE', description: 'SUPPLY OF HT CABLE JOINTING KITS', quantity: 3, unit: 'TP', netPrice: 7843.50, currency: 'INR', taxCode: 'G1' },
  { item: '007', poNumber: '8200231872', poItem: '00010', material: 'SERVICE', description: 'CABLE TESTING & COMMISSIONING CHARGES', quantity: 5, unit: 'SFT', netPrice: 7470.00, currency: 'INR', taxCode: 'G1' },
  { item: '008', poNumber: '8200231872', poItem: '00010', material: 'SERVICE', description: 'SUPPLY OF CABLE END TERMINATION KIT', quantity: 1, unit: 'EA', netPrice: 1643.40, currency: 'INR', taxCode: 'G1' },
  { item: '009', poNumber: '8200231872', poItem: '00010', material: 'SERVICE', description: 'REINSTATEMENT OF TRENCH AFTER BACKFILL', quantity: 2, unit: 'SFT', netPrice: 1643.40, currency: 'INR', taxCode: 'G1' },
];

// =============================================================================
// Purchase Order Details (keyed by PO number)
// =============================================================================

export const poDetails = {
  '8200231872': {
    poNumber: '8200231872',
    contractType: 'Contract Release Ord',
    createdBy: 'Deepak Kumbhar',
    supplier: '100015200 AKANKSHA INFRACOM PVT L...',
    docDate: '17.06.2026',
    department: '058',
    ldSla: '1 Yes-LD',
    bgFlag: 'Yes',
    segment: '',
    olaRefNo: '9200033303',
    olaDate: '17.06.2026',
    initialReleaseDate: '17.06.2026',
    latestReleaseDate: '17.06.2026',
    orderValue: 2399000.00,
    fivePercentValue: 239900.04,
    previousCPBG: 196892.78,
    currentHold: 0,
    remainingToDeduct: 43007.22,
    cbgPercent: 1.32,
    tenure: '42 Months',
    bgCalculatedOn: 'Annualized OLA Value Without GST',
    paymentTermsText: '100% of the invoice amount shall be released within 45 days from the date of submission of error free invoice supported by all required documents.',
    safetyRetentionText: 'Safety Retention (If Applicable) shall be as per Safety Terms & Conditions.',
    bankGuaranteeText: 'Bank Guarantee is applicable in this Purchase Order. Contractor shall submit a Contract performance Bank Guarantee (CPBG) of 10% of Annual Contract Value or INR 5.00 Lakhs (whichever is lower). CPBG shall be submitted within 15 days from the date of OLA as per approved format.',
    items: [
      { sNo: 10, itemType: 'F', category: 'D', shortText: '33kV Dharavi to Raheja Hospital...', poQuantity: '1 AU', delivDate: '18.08.2026', netPrice: 91996.04, currency: 'INR', per: 1, opu: 'AU', matlGroup: 'Cost Of Ser-Ot..', plant: 'Distribution' },
    ],
    serviceEntries: [
      { materialDoc: '5001580513', mvt: '101', shText: 'WE', itemPostingDate: '1 19.06.2026', entrySheet: 'AIPL8200231872', quantity: 1, amtInLocCur: 48480.30, oUn: 'EA', currency: 'INR', qtyInOPU: 1, orderPriceUnit: 'AU', amountCcy: 48480.30, entryDate: '26.06.2026', companyCode: '1000' },
      { materialDoc: '5001580513', mvt: '101', shText: 'WE', itemPostingDate: '2 19.06.2026', entrySheet: 'AIPL8200231872', quantity: 3.800, amtInLocCur: 2847.11, oUn: 'M3', currency: 'INR', qtyInOPU: 3.800, orderPriceUnit: 'AU', amountCcy: 2847.11, entryDate: '26.06.2026', companyCode: '1000' },
      { materialDoc: '5001580513', mvt: '101', shText: 'WE', itemPostingDate: '3 19.06.2026', entrySheet: 'AIPL8200231872', quantity: 8, amtInLocCur: 1057.76, oUn: 'M', currency: 'INR', qtyInOPU: 8, orderPriceUnit: 'AU', amountCcy: 1057.76, entryDate: '26.06.2026', companyCode: '1000' },
      { materialDoc: '5001580513', mvt: '101', shText: 'WE', itemPostingDate: '4 19.06.2026', entrySheet: 'AIPL8200231872', quantity: 11400, amtInLocCur: 1607.79, oUn: 'M3', currency: 'INR', qtyInOPU: 11400, orderPriceUnit: 'AU', amountCcy: 1607.79, entryDate: '26.06.2026', companyCode: '1000' },
      { materialDoc: '5001580512', mvt: '101', shText: 'WE', itemPostingDate: '5 19.06.2026', entrySheet: 'AIPL8200231872', quantity: 400, amtInLocCur: 10577.52, oUn: 'BAG', currency: 'INR', qtyInOPU: 400, orderPriceUnit: 'AU', amountCcy: 10577.52, entryDate: '26.06.2026', companyCode: '1000' },
      { materialDoc: '5001580512', mvt: '101', shText: 'WE', itemPostingDate: '6 19.06.2026', entrySheet: 'AIPL8200231872', quantity: 3, amtInLocCur: 9255.34, oUn: 'TP', currency: 'INR', qtyInOPU: 3, orderPriceUnit: 'AU', amountCcy: 9255.34, entryDate: '26.06.2026', companyCode: '1000' },
      { materialDoc: '5001580513', mvt: '101', shText: 'WE', itemPostingDate: '7 19.06.2026', entrySheet: 'AIPL8200231872', quantity: 5, amtInLocCur: 8814.60, oUn: 'SFT', currency: 'INR', qtyInOPU: 5, orderPriceUnit: 'AU', amountCcy: 8814.60, entryDate: '26.06.2026', companyCode: '1000' },
      { materialDoc: '5001580512', mvt: '101', shText: 'WE', itemPostingDate: '8 19.06.2026', entrySheet: 'AIPL8200231872', quantity: 1, amtInLocCur: 1939.22, oUn: 'EA', currency: 'INR', qtyInOPU: 1, orderPriceUnit: 'AU', amountCcy: 1939.22, entryDate: '26.06.2026', companyCode: '1000' },
      { materialDoc: '5001580512', mvt: '101', shText: 'WE', itemPostingDate: '9 19.06.2026', entrySheet: 'AIPL8200231872', quantity: 2, amtInLocCur: 1939.22, oUn: 'SFT', currency: 'INR', qtyInOPU: 2, orderPriceUnit: 'AU', amountCcy: 1939.22, entryDate: '26.06.2026', companyCode: '1000' },
    ],
    attachments: [
      { icon: 'pdf', title: '8200231872_20260617_145545.pdf', createdOn: '17.06.2026', creatorName: 'Arvind Hanumant Pophale', createdAt: '14:55:45' },
    ],
  },

  '8200231874': {
    poNumber: '8200231874',
    contractType: 'Contract Release Ord',
    createdBy: 'Rajesh Patil',
    supplier: '100017292 DAKSH ENGINEERING CO.',
    docDate: '10.06.2026',
    department: '058',
    ldSla: '1 Yes-LD',
    bgFlag: 'Yes',
    segment: '',
    olaRefNo: '9200033298',
    olaDate: '10.06.2026',
    initialReleaseDate: '10.06.2026',
    latestReleaseDate: '12.06.2026',
    orderValue: 4850000.00,
    fivePercentValue: 485000.00,
    previousCPBG: 312450.00,
    currentHold: 0,
    remainingToDeduct: 172550.00,
    cbgPercent: 2.14,
    tenure: '36 Months',
    bgCalculatedOn: 'Annualized OLA Value Without GST',
    paymentTermsText: '100% of the invoice amount shall be released within 45 days from the date of submission of error free invoice supported by all required documents.',
    safetyRetentionText: 'Safety Retention @ 2.5% of the invoice value shall be deducted from each running bill.',
    bankGuaranteeText: 'Bank Guarantee is applicable in this Purchase Order. Contractor shall submit a Contract performance Bank Guarantee (CPBG) of 10% of Annual Contract Value or INR 5.00 Lakhs (whichever is lower). CPBG shall be submitted within 15 days from the date of OLA as per approved format.',
    items: [
      { sNo: 10, itemType: 'F', category: 'D', shortText: 'Steel Structure Fabrication & Erection...', poQuantity: '1 AU', delivDate: '20.08.2026', netPrice: 182864.41, currency: 'INR', per: 1, opu: 'AU', matlGroup: 'Cost Of Ser-Ot..', plant: 'Distribution' },
    ],
    serviceEntries: [
      { materialDoc: '5001580520', mvt: '101', shText: 'WE', itemPostingDate: '1 15.06.2026', entrySheet: 'DKSH8200231874', quantity: 1, amtInLocCur: 92450.00, oUn: 'EA', currency: 'INR', qtyInOPU: 1, orderPriceUnit: 'AU', amountCcy: 92450.00, entryDate: '22.06.2026', companyCode: '1000' },
      { materialDoc: '5001580520', mvt: '101', shText: 'WE', itemPostingDate: '2 15.06.2026', entrySheet: 'DKSH8200231874', quantity: 25, amtInLocCur: 43250.00, oUn: 'MT', currency: 'INR', qtyInOPU: 25, orderPriceUnit: 'AU', amountCcy: 43250.00, entryDate: '22.06.2026', companyCode: '1000' },
      { materialDoc: '5001580521', mvt: '101', shText: 'WE', itemPostingDate: '3 15.06.2026', entrySheet: 'DKSH8200231874', quantity: 12, amtInLocCur: 28760.00, oUn: 'SFT', currency: 'INR', qtyInOPU: 12, orderPriceUnit: 'AU', amountCcy: 28760.00, entryDate: '22.06.2026', companyCode: '1000' },
      { materialDoc: '5001580521', mvt: '101', shText: 'WE', itemPostingDate: '4 15.06.2026', entrySheet: 'DKSH8200231874', quantity: 6, amtInLocCur: 18404.41, oUn: 'EA', currency: 'INR', qtyInOPU: 6, orderPriceUnit: 'AU', amountCcy: 18404.41, entryDate: '22.06.2026', companyCode: '1000' },
    ],
    attachments: [
      { icon: 'pdf', title: '8200231874_20260610_102230.pdf', createdOn: '10.06.2026', creatorName: 'Rajesh Patil', createdAt: '10:22:30' },
    ],
  },

  '8200231879': {
    poNumber: '8200231879',
    contractType: 'Contract Release Ord',
    createdBy: 'Sunil Gaikwad',
    supplier: '100007362 KUMAR FABRICATORS',
    docDate: '15.06.2026',
    department: '062',
    ldSla: '1 Yes-LD',
    bgFlag: 'Yes',
    segment: '',
    olaRefNo: '9200033310',
    olaDate: '15.06.2026',
    initialReleaseDate: '15.06.2026',
    latestReleaseDate: '16.06.2026',
    orderValue: 8500000.00,
    fivePercentValue: 850000.00,
    previousCPBG: 500000.00,
    currentHold: 0,
    remainingToDeduct: 350000.00,
    cbgPercent: 1.89,
    tenure: '48 Months',
    bgCalculatedOn: 'Annualized OLA Value Without GST',
    paymentTermsText: '100% of the invoice amount shall be released within 45 days from the date of submission of error free invoice supported by all required documents.',
    safetyRetentionText: 'Safety Retention @ 2.5% of the invoice value shall be deducted from each running bill.',
    bankGuaranteeText: 'Bank Guarantee is applicable in this Purchase Order. Contractor shall submit a Contract performance Bank Guarantee (CPBG) of 10% of Annual Contract Value or INR 5.00 Lakhs (whichever is lower). CPBG shall be submitted within 15 days from the date of OLA as per approved format.',
    items: [
      { sNo: 10, itemType: 'F', category: 'D', shortText: 'MS Cable Tray Fabrication 300mm...', poQuantity: '200 M', delivDate: '22.08.2026', netPrice: 245000.00, currency: 'INR', per: 1, opu: 'M', matlGroup: 'Cost Of Ser-Ot..', plant: 'Distribution' },
      { sNo: 20, itemType: 'F', category: 'D', shortText: 'MS Cable Tray Covers 300mm...', poQuantity: '200 M', delivDate: '22.08.2026', netPrice: 141610.17, currency: 'INR', per: 1, opu: 'M', matlGroup: 'Cost Of Ser-Ot..', plant: 'Distribution' },
    ],
    serviceEntries: [
      { materialDoc: '5001580530', mvt: '101', shText: 'WE', itemPostingDate: '1 23.06.2026', entrySheet: 'KFAB8200231879', quantity: 100, amtInLocCur: 122500.00, oUn: 'M', currency: 'INR', qtyInOPU: 100, orderPriceUnit: 'M', amountCcy: 122500.00, entryDate: '28.06.2026', companyCode: '1000' },
      { materialDoc: '5001580530', mvt: '101', shText: 'WE', itemPostingDate: '2 23.06.2026', entrySheet: 'KFAB8200231879', quantity: 100, amtInLocCur: 70805.09, oUn: 'M', currency: 'INR', qtyInOPU: 100, orderPriceUnit: 'M', amountCcy: 70805.09, entryDate: '28.06.2026', companyCode: '1000' },
      { materialDoc: '5001580531', mvt: '101', shText: 'WE', itemPostingDate: '3 23.06.2026', entrySheet: 'KFAB8200231879', quantity: 50, amtInLocCur: 96305.08, oUn: 'M', currency: 'INR', qtyInOPU: 50, orderPriceUnit: 'M', amountCcy: 96305.08, entryDate: '28.06.2026', companyCode: '1000' },
      { materialDoc: '5001580531', mvt: '101', shText: 'WE', itemPostingDate: '4 23.06.2026', entrySheet: 'KFAB8200231879', quantity: 200, amtInLocCur: 97000.00, oUn: 'KG', currency: 'INR', qtyInOPU: 200, orderPriceUnit: 'KG', amountCcy: 97000.00, entryDate: '28.06.2026', companyCode: '1000' },
    ],
    attachments: [
      { icon: 'pdf', title: '8200231879_20260615_113012.pdf', createdOn: '15.06.2026', creatorName: 'Sunil Gaikwad', createdAt: '11:30:12' },
      { icon: 'pdf', title: 'SES_Approval_8200231879.pdf', createdOn: '23.06.2026', creatorName: 'Sunil Gaikwad', createdAt: '16:45:22' },
    ],
  },

  '8200231883': {
    poNumber: '8200231883',
    contractType: 'Contract Release Ord',
    createdBy: 'Amit Deshmukh',
    supplier: '180002881 M POWER INDIA PRIVATE ...',
    docDate: '12.06.2026',
    department: '055',
    ldSla: '1 Yes-LD',
    bgFlag: 'Yes',
    segment: '',
    olaRefNo: '9200033315',
    olaDate: '12.06.2026',
    initialReleaseDate: '12.06.2026',
    latestReleaseDate: '14.06.2026',
    orderValue: 12500000.00,
    fivePercentValue: 1250000.00,
    previousCPBG: 890000.00,
    currentHold: 0,
    remainingToDeduct: 360000.00,
    cbgPercent: 1.75,
    tenure: '60 Months',
    bgCalculatedOn: 'Annualized OLA Value Without GST',
    paymentTermsText: '100% of the invoice amount shall be released within 60 days from the date of submission of error free invoice supported by all required documents.',
    safetyRetentionText: 'Safety Retention @ 2.5% of the invoice value shall be deducted from each running bill.',
    bankGuaranteeText: 'Bank Guarantee is applicable in this Purchase Order. Contractor shall submit a Contract performance Bank Guarantee (CPBG) of 10% of Annual Contract Value or INR 5.00 Lakhs (whichever is lower). CPBG shall be submitted within 15 days from the date of OLA as per approved format.',
    items: [
      { sNo: 10, itemType: 'F', category: 'D', shortText: 'HT Switchgear Panel 33kV Indoor...', poQuantity: '2 EA', delivDate: '25.08.2026', netPrice: 298500.00, currency: 'INR', per: 1, opu: 'EA', matlGroup: 'Switchgear-HT..', plant: 'Distribution' },
      { sNo: 20, itemType: 'F', category: 'D', shortText: 'HT Cable Termination & Testing...', poQuantity: '4 EA', delivDate: '25.08.2026', netPrice: 145059.32, currency: 'INR', per: 1, opu: 'EA', matlGroup: 'Cost Of Ser-Ot..', plant: 'Distribution' },
    ],
    serviceEntries: [
      { materialDoc: '5001580540', mvt: '101', shText: 'WE', itemPostingDate: '1 20.06.2026', entrySheet: 'MPWR8200231883', quantity: 2, amtInLocCur: 298500.00, oUn: 'EA', currency: 'INR', qtyInOPU: 2, orderPriceUnit: 'EA', amountCcy: 298500.00, entryDate: '27.06.2026', companyCode: '1000' },
      { materialDoc: '5001580540', mvt: '101', shText: 'WE', itemPostingDate: '2 20.06.2026', entrySheet: 'MPWR8200231883', quantity: 4, amtInLocCur: 85200.00, oUn: 'EA', currency: 'INR', qtyInOPU: 4, orderPriceUnit: 'EA', amountCcy: 85200.00, entryDate: '27.06.2026', companyCode: '1000' },
      { materialDoc: '5001580541', mvt: '101', shText: 'WE', itemPostingDate: '3 20.06.2026', entrySheet: 'MPWR8200231883', quantity: 1, amtInLocCur: 59859.32, oUn: 'LS', currency: 'INR', qtyInOPU: 1, orderPriceUnit: 'LS', amountCcy: 59859.32, entryDate: '27.06.2026', companyCode: '1000' },
    ],
    attachments: [
      { icon: 'pdf', title: '8200231883_20260612_091500.pdf', createdOn: '12.06.2026', creatorName: 'Amit Deshmukh', createdAt: '09:15:00' },
      { icon: 'pdf', title: 'SES_Approval_8200231883.pdf', createdOn: '20.06.2026', creatorName: 'Amit Deshmukh', createdAt: '14:30:45' },
      { icon: 'pdf', title: 'Test_Report_Switchgear.pdf', createdOn: '25.06.2026', creatorName: 'M Power QA Team', createdAt: '11:20:18' },
    ],
  },
};
'''

content += r"""
// =============================================================================
// Retention Configuration
// =============================================================================

export const retentionConfig = [
  { type: 'Z001', name: 'RETENTION : OTHER', percent: null },
  { type: 'Z002', name: 'RETENTION : INSTALLATION', percent: null },
  { type: 'Z003', name: 'RETENTION : COMMISSING', percent: null },
  { type: 'Z004', name: 'RETENTION : PBG', percent: 0 },
  { type: 'Z005', name: 'RETENTION : CPBG', percent: 10 },
  { type: 'Z006', name: 'RETENTION : SAFETY', percent: 2.5 },
  { type: 'Z007', name: 'RETENTION : LD', percent: null },
  { type: 'Z008', name: 'RETENTION : WARRANTY', percent: null },
  { type: 'Z009', name: 'RETENTION : ADVANCE', percent: null },
  { type: 'Z010', name: 'RETENTION : PAYMENT TERMS', percent: null },
];

// =============================================================================
// HSN Code Mapping for RCM (Reverse Charge Mechanism)
// =============================================================================

export const hsnCodeMapping = {
  govtPayment: '999111',
  legalPayment: '998212',
  cab: '996501(RCM)',
  securityGuard: '998529',
  transport: '996791',
  sponsorship: '998397',
  directorOfCompany: '998311',
  importServices: '998213',
};

// =============================================================================
// Invoice Data Extraction Checklist
// =============================================================================

export const invoiceChecklist = [
  { srNo: 1, title: 'COMPANY NAME', value: 'THE TATA POWER CO. LTD.' },
  { srNo: 2, title: 'SCANNING LOCATION / DEPARTMENT', value: 'DH01 - DIST. CAPEX CONTRACT' },
  { srNo: 3, title: 'VENDOR CODE', value: '100015200' },
  { srNo: 4, title: 'VENDOR NAME', value: 'AKANKSHA INFRACOM PVT. LTD.' },
  { srNo: 5, title: 'INVOICE TYPE', value: 'SERVICE' },
  { srNo: 6, title: 'PO NUMBER', value: '8200231872' },
  { srNo: 7, title: 'EMPLOYEE NO & NAME OF ENGINEER / USER', value: '213046 Deepak Kumbhar' },
  { srNo: 8, title: 'DELIVERY CHALLEN NO IN CASE OF SUPPLY INVOICE', value: 'NA' },
];

// =============================================================================
// Validation Rules (Auto Park - Stage 3)
// =============================================================================

export const validationRules = [
  { category: 'Vendor Validation', rules: ['Vendor exists', 'Vendor active'] },
  { category: 'Purchase Order Validation', rules: ['PO exists', 'PO released', 'PO active'] },
  { category: 'Duplicate Validation', rules: ['Duplicate Invoice', 'Duplicate Reference Number'] },
  { category: 'Currency Validation', rules: ['Invoice Currency vs PO Currency'] },
  { category: 'Tax Validation', rules: ['GST', 'Vendor GST', 'Company GST'] },
  { category: 'Invoice Validation', rules: ['Invoice Number', 'Invoice Date', 'Amount', 'Mandatory Fields'] },
  { category: 'Other Validations', rules: ['PO completeness', 'Vendor reference', 'Company Code', 'Business Rules'] },
];
"""

with open(OUTPUT_PATH, 'w', encoding='utf-8', newline='\n') as f:
    f.write(content)

print(f"Written {len(content)} bytes to {OUTPUT_PATH}")
