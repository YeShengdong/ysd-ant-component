export const base64ToBlob = (data: any, type: string, sliceSize = 512) => {
  const byteCharacters = atob(data);
  const byteArrays: any[] = [];
  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    let i = 0;
    while (i < slice.length) {
      byteNumbers[i] = slice.charCodeAt(i);
      i += 1;
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
  const blob = new Blob(byteArrays, { type });
  return blob;
};

export const downloadFile = (fileData: string, fileName: string) => {
  const blob = window.URL.createObjectURL(
    base64ToBlob(
      fileData,
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )
  );
  const tmpA = document.createElement("a");
  tmpA.download = fileName;
  tmpA.href = blob;
  tmpA.click(); // 模拟点击实现下载

  setTimeout(() => {
    // 延时释放
    URL.revokeObjectURL(blob); // 用URL.revokeObjectURL()来释放这个object URL
  }, 100);
};
