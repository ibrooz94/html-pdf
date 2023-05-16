// import pdfFonts from "pdfmake/build/vfs_fonts";
import pdfMake from "pdfmake/build/pdfmake";
import { useCounterStore } from "../store/piniaStore"
import pinia from "../store/store";
const stores = useCounterStore(pinia);

pdfMake.fonts = {
  Roboto: {
    normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
    bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
    italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
    bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf'
  },
}

function exportPdfTemplate(companyOverview, projectDescription, scopeofWorkLegal, expirationDate, expirationTimeFrame) {
  let docDefinition = {
    content: [
      {
        text: [
          'Dear Sir/Madam,\n',
        ]
      },
      {
        text: 'We write further to your pre-qualification as Transaction Counsel for infrastructure projects that InfraCredit guarantees from time to time; and now request for a quotation to provide Legal Due Diligence and Transaction Services in connection with a proposed transaction. ',
        margin: [0, 15, 0, 25],
      },

      {
        text: 'Background',
        bold: true
      },

      {
        stack: [
          `${companyOverview}`,
        ],
        //left, top, bottom, right
        margin: [0, 15, 0, 25],
        alignment: 'justify'
      },

      {
        text: 'Transaction/Request name',
        bold: true
      },
      {
        stack: [
          `${projectDescription}`,
        ],

        margin: [0, 15, 0, 25],
        alignment: 'justify'
      },

      {
        text: 'Scope of Work',
        bold: true
      },
      {
        stack: [
          `${scopeofWorkLegal}`,
        ],

        margin: [0, 15, 0, 25],
        alignment: 'justify'
      },

      {
        text: 'Please note:',
        margin: [0, 5, 0, 15],
        bold: true
      },
      {
        ul: [
          'Your quote shall be simple and economical, providing a straightforward and concise description of the fees you propose to charge for providing the Legal Due Diligence & Transaction Services. Your fees should be within the range submitted to InfraCredit in connection with your pre-qualification as Transaction Counsel. All quotes will become the property of InfraCredit and will not be returned.',
          'The issue of this RfQ does not imply that InfraCredit is bound to select an Applicant or to appoint the Selected Applicant for the Services and InfraCredit reserves the right to reject all or any of the Quotations without assigning any reasons whatsoever.',
          'InfraCredit reserves the right to select the appropriate service provider(s) based on its requirements, which will, barring extenuating circumstances, be made on a least-cost basis. The decision of the evaluation panel will be final.',
          'At any time during the validity of the quotation, no price variation due to escalation, inflation, fluctuation in exchange rates, or any other market factors shall be accepted by InfraCredit after it has received the quotation.'
        ],
        alignment: 'justify'
      },
      {
        text: 'Submission of quotes\n',
        margin: [0, 20],
        bold: true
      },

      {
        text: `Kindly upload your quote on your portal by close of business in ${expirationDate} ${expirationTimeFrame} time.\n`,
        alignment: 'justify'
      },


      {
        text: `Thank you.`,
        margin: [0, 15],

      },
    ],
    defaultStyle:{
      font: 'Roboto'
  },
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        alignment: 'right',
        margin: [0, 190, 0, 80]
      },
      subheader: {
        fontSize: 14
      },
      superMargin: {
        margin: [20, 0, 40, 0],
        fontSize: 15
      }
    }

  };
  pdfMake.createPdf(docDefinition).getDataUrl(function (url) {
    stores.testDocument3 = url
  })

}

function exportPdfDownload(rfqNo, companyOverview, projectDescription, scopeofWorkLegal, expirationDate) {
  const newdate = new Date(expirationDate);
  let docDefinition = {
    content: [
      {
        text: [
          'Dear Sir/Madam,\n',
        ]
      },
      {
        text: 'We write further to your pre-qualification as Transaction Counsel for infrastructure projects that InfraCredit guarantees from time to time; and now request for a quotation to provide Legal Due Diligence and Transaction Services in connection with a proposed transaction. ',
        margin: [0, 15, 0, 25],
      },

      {
        text: 'Company Overview',
        bold: true
      },
      {
        stack: [
          `${companyOverview}`,
        ],
        //left, top, bottom, right
        margin: [0, 15, 0, 25],
        alignment: 'justify'
      },

      {
        text: 'Project Description',
        bold: true
      },
      {
        stack: [
          `${projectDescription}`,
        ],

        margin: [0, 15, 0, 25],
        alignment: 'justify'
      },

      {
        text: 'Scope of Work',
        bold: true
      },
      {
        stack: [
          `${scopeofWorkLegal}`,
        ],

        margin: [0, 15, 0, 25],
        alignment: 'justify'
      },

      {
        text: 'Please note:',
        margin: [0, 5, 0, 15],
        bold: true
      },
      {
        ul: [
          'Your quote shall be simple and economical, providing a straightforward and concise description of the fees you propose to charge for providing the Legal Due Diligence & Transaction Services. Your fees should be within the range submitted to InfraCredit in connection with your pre-qualification as Transaction Counsel. All quotes will become the property of InfraCredit and will not be returned.',
          'The issue of this RfQ does not imply that InfraCredit is bound to select an Applicant or to appoint the Selected Applicant for the Services and InfraCredit reserves the right to reject all or any of the Quotations without assigning any reasons whatsoever.',
          'InfraCredit reserves the right to select the appropriate service provider(s) based on its requirements, which will, barring extenuating circumstances, be made on a least-cost basis. The decision of the evaluation panel will be final.',
          'At any time during the validity of the quotation, no price variation due to escalation, inflation, fluctuation in exchange rates, or any other market factors shall be accepted by InfraCredit after it has received the quotation.'
        ],
        alignment: 'justify'
      },
      {
        text: 'Submission of quotes\n',
        margin: [0, 20],
        bold: true
      },

      {
        text: `Kindly upload your quote on your portal by close of business on ${newdate}.\n`,
        alignment: 'justify'
      },


      {
        text: `Thank you.`,
        margin: [0, 15],

      },
    ],
    defaultStyle:{
        font: 'Roboto'
    },
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        alignment: 'right',
        margin: [0, 190, 0, 80]
      },
      subheader: {
        fontSize: 14
      },
      superMargin: {
        margin: [20, 0, 40, 0],
        fontSize: 15
      }
    }

  };
  pdfMake.createPdf(docDefinition).download(rfqNo)

}


export default {
  exportPdfTemplate,
  exportPdfDownload
}