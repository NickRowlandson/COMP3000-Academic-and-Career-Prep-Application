const pdffiller = require('pdffiller');
var sourcePDF = "../pdf/prf-source.pdf";
var destinationPDF = "../pdf/prf_complete.pdf";

class PRFService {
  populatePRF(info): void {
    console.log(info);
    var data = {
        "first_name": "John"
    };
    try {
      // pdffiller.fillForm(sourcePDF, destinationPDF, data, function(err) {
      //     if (err) throw err;
      //     console.log("PRF GENERATED.");
      // });
      // Override the default field name regex. Default: /FieldName: ([^\n]*)/
      var nameRegex = null;

      var FDF_data = pdffiller.generateFDFTemplate( sourcePDF, nameRegex, function(err, fdfData) {
          if (err) throw err;
          console.log(fdfData);
      });
    } catch (err) {
      console.log(err);
    }
  }
}
export = PRFService;
