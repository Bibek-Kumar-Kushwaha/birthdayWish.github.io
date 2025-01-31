import React from 'react';
import html2canvas from 'html2canvas';

function DownloadButton() {
  const handleDownload = () => {
    const wishPage = document.getElementById('wish-page');
    html2canvas(wishPage).then((canvas) => {
      const link = document.createElement('a');
      link.download = 'birthday_wish.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  return (
    <button
      onClick={handleDownload}
      className="mt-6 py-3 px-6 text-lg font-semibold bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300"
    >
      Download Wish
    </button>
  );
}

export default DownloadButton;
