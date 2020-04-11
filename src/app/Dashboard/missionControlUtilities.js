import { ExportToCsv } from "export-to-csv";

export function downloadAsCsv(downloadData, csvTitle) {
  const options = {
    fieldSeparator: ",",
    quoteStrings: '"',
    decimalSeparator: ".",
    showLabels: true,
    showTitle: true,
    title: csvTitle,
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
  };

  const csvExporter = new ExportToCsv(options);

  csvExporter.generateCsv(downloadData);
}
