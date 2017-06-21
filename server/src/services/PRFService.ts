//const pdffiller = require('pdffiller');

class PRFService {
  populatePRF(info): void {
    console.log(info);
    try {
      console.log("PRF function not yet available...");
      // var sourcePDF = "./pdf/prf-source.pdf";
      // var destinationPDF = "./pdf/prf_complete.pdf";
      // var data = {
      //     "LastName": info.lastName,
      //     "FirstName": info.firstName
      // };
      // var shouldFlatten = false;
      //
      // pdffiller.fillFormWithFlatten( sourcePDF, destinationPDF, data, shouldFlatten, function(err) {
      //     if (err) {
      //       console.log(err);
      //     } else {
      //       console.log("PRF GENERATED.");
      //     }
      // });

      // Override the default field name regex. Default: /FieldName: ([^\n]*)/
      // var nameRegex = null;
      //
      // var FDF_data = pdffiller.generateFDFTemplate( sourcePDF, nameRegex, function(err, fdfData) {
      //     if (err) throw err;
      //     console.log(fdfData);
      // });
    } catch (err) {
      console.log(err);
    }
  }
}
export = PRFService;
