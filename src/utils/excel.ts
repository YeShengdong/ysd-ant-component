
import * as XLSX from 'xlsx-js-style';
import { getFileNameWithDate } from './file';

interface DownloadExcelOptions extends XLSX.JSON2SheetOpts {
  fileName: string;
  sheetName?: string;
  colsWidth?: any[];
}

const setWorksheetCommonStyle = (ws: any) => {
  for (const i in ws) {
    if (typeof ws[i] !== 'object') {
      continue;
    }

    let cell = XLSX.utils.decode_cell(i);

    ws[i].s = {
      // styling for all cells
      font: {
        name: 'arial',
      },
      alignment: {
        // vertical: 'center',
        // horizontal: 'center',
        wrapText: '1', // any truthy value here
      },
      border: {
        right: {
          style: 'thin',
          color: '000000',
        },
        left: {
          style: 'thin',
          color: '000000',
        },
      },
    };

    if (cell.c === 0) {
      // first column
      ws[i].s.numFmt = 'DD/MM/YYYY HH:MM'; // for dates
      ws[i].z = 'DD/MM/YYYY HH:MM';
    } else {
      ws[i].s.numFmt = '00.00'; // other numbers
    }

    if (cell.r === 0) {
      // first row
      ws[i].s.border.bottom = {
        // bottom border
        style: 'thin',
        color: '000000',
      };

      ws[i].s.fill = {
        // background color
        patternType: 'solid',
        fgColor: { rgb: 'b2b2b2' },
        bgColor: { rgb: 'b2b2b2' },
      };
    }

    if (cell.r % 2) {
      // every other row
      ws[i].s.fill = {
        // background color
        patternType: 'solid',
        fgColor: { rgb: 'e1eaff' },
        bgColor: { rgb: 'e1eaff' },
      };
    }
  }
};

export const downloadExcel = (data: any[], options: DownloadExcelOptions) => {
  const { fileName, sheetName = 'sheet', colsWidth, ...jsonToSheetOptions } = options;
  const fileNameWithDate = getFileNameWithDate(fileName);

  const ws = XLSX.utils.json_to_sheet(data, jsonToSheetOptions);
  const workbook = XLSX.utils.book_new();

  setWorksheetCommonStyle(ws);

  if (colsWidth) {
    ws['!cols'] = colsWidth;
  }

  XLSX.utils.book_append_sheet(workbook, ws, sheetName);
  XLSX.writeFile(workbook, fileNameWithDate);
};
