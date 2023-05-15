import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs; //TODO: Change Font back

function exportPdfTemplate(
  reportNo,
  charts,
  creationDate,
  user,
  businessUnit,
  department,
  newGurantees,
  newMandates,
  followMandates,
  creditApproved,
  guaranteedTransactions,
  mandatedDealPipeline,
  approvedMandates,
  creditApprovedMandates
) {
  let docDefinition = {
    content: [
      { text: "Current Guarantee Portfolio", style: "header" },

      {
        text: `Total guarantees issued since inception to date has grown to c. Nx.xx as at ${creationDate} following the issuance of the Series III Bonds in favour of the Lagos Free Zone Company, with the largest exposure to an obligor currently at x.xx% - i.e., the aggregate guarantee to LFZC, a “A-” rated entity. Similarly, our largest sector exposure is Inputs to Infrastructure (x.xx%) given the exposure to LFZC, with the Transportation sector coming a close second at 25.4% following the additional Nx.xx extended to TSL via a Bridge Facility with Stanbic IBTC Infra Fund`,
        margin: [0, 15, 0, 25],
        alignment: "justify",
      },

      {
        columns: [
          {
            text: `Analysis of Guaranteed Transactions Since Inception of Nx.xx as at ${creationDate}`,
          },
          {
            text: `Categorisation of the Guarantee Portfolio of Nx.xx by sector as at 31 March ${creationDate}`,
          },
        ],
      },
      {
        columns: [
          {
            image: `${charts} `,
            margin: [-10, 0, 0, 20],
            width: 260,
            height: 260,
          },
          {
            image: `${charts} `,
            margin: [0, 0, 0, 20],
            width: 260,
            height: 260,
          },
        ],
      },

      {
        text: "Key Statistics on O&S Activity – Inception to Date",
        style: "header",
      },
      {
        style: "tableExample",
        table: {
          widths: [200, "*", "*", "*"],
          body: [
            ["SUMMARY OF KEY ACTIVITY", "2017-21", "2022", "2023"],
            [
              "New Guarantees Executed",
              {
                text: "8",
                italics: true,
                color: "black",
              },
              {
                text: "8",
                italics: true,
                color: "black",
              },
              { text: `${newGurantees}`, italics: true, color: "black" },
            ],
            [
              "Size of New Guarantees Executed",
              {
                text: "Nx.xx",
                italics: true,
                color: "black",
              },
              {
                text: "Nx.xx",
                italics: true,
                color: "black",
              },
              { text: "Nx.xx", italics: true, color: "black" },
            ],
            [
              "New Mandates Signed(incl. Follow on Mandates",
              {
                text: "44",
                italics: true,
                color: "black",
              },
              {
                text: "12",
                italics: true,
                color: "black",
              },
              { text: `${newMandates}`, italics: true, color: "black" },
            ],
            [
              "Size of New Mandates Signed",
              {
                text: "Nx.xx",
                italics: true,
                color: "black",
              },
              {
                text: "Nx.xx",
                italics: true,
                color: "black",
              },
              { text: `Nx.xx.`, italics: true, color: "black" },
            ],
            [
              "Size of Follow-On Mandates",
              {
                text: "Nx.xx",
                italics: true,
                color: "black",
              },
              {
                text: "Nx.xx",
                italics: true,
                color: "black",
              },
              { text: `Nx.xx.`, italics: true, color: "black" },
            ],
            [
              "New Business Committee (NBC) Approvals",
              {
                text: "64",
                italics: true,
                color: "black",
              },
              {
                text: "12",
                italics: true,
                color: "black",
              },
              { text: `7.`, italics: true, color: "black" },
            ],
            [
              "% NBC Approvals Converted to Mandates (#)",
              {
                text: "0.75%",
                italics: true,
                color: "black",
              },
              {
                text: "0.59%",
                italics: true,
                color: "black",
              },
              { text: `0.7%.`, italics: true, color: "black" },
            ],
            [
              "No. of Credit Committee Approved Deals ",
              {
                text: "2",
                italics: true,
                color: "black",
              },
              {
                text: "0",
                italics: true,
                color: "black",
              },
              { text: `${creditApproved}`, italics: true, color: "black" },
            ],
            [
              "% of Credit App. Deals converted to Portfolio (#)",
              {
                text: "34.8%",
                italics: true,
                color: "black",
              },
              {
                text: "40.0%",
                italics: true,
                color: "black",
              },
              { text: `33.3%.`, italics: true, color: "black" },
            ],
            [
              "Size of Credit Approved Deals (Active)",
              {
                text: "Nx.xx",
                italics: true,
                color: "black",
              },
              {
                text: "Nx.xx",
                italics: true,
                color: "black",
              },
              { text: `Nx.xx.`, italics: true, color: "black" },
            ],
            [
              "% of Credit App. Deals converted to Portfolio (value)",
              {
                text: "37.7%",
                italics: true,
                color: "black",
              },
              {
                text: "35.4%",
                italics: true,
                color: "black",
              },
              {
                text: `70%.`,
                italics: true,
                color: "black",
              },
            ],
          ],
        },
      },
    ],
    //   defaultStyle:{
    //     font: 'Roboto'
    // },
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        // decoration: underline,
        alignment: "left",
        margin: [0, 20, 0, 20],
      },
      tableExample: {
        margin: [0, 5, 0, 15],
      },
      subheader: {
        fontSize: 14,
      },
      superMargin: {
        margin: [20, 0, 40, 0],
        fontSize: 15,
      },
    },
  };
  // pdfMake.createPdf(docDefinition).getDataUrl(function (url) {
  //   stores.testDocument3 = url
  // })
  const pdfDoc = pdfMake.createPdf(docDefinition);
  return pdfDoc;
}

export default exportPdfTemplate;
