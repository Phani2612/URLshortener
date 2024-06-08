import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import './modal.css';

const QrLogo = './logo.png';

const QRModal = ({ isOpen, onClose, url, hash }) => {
    // Define state for the QR code canvas and image
    const [qrCodeUrl, setQrCodeUrl] = useState('');

    // Generate QR code as an image URL and add the logo
    useEffect(() => {
        if (url) {
            const qrCodeCanvas = document.getElementById('qr-code-canvas');
            
            // Generate QR code on the canvas
            QRCode.toCanvas(qrCodeCanvas, url, {
                width: 256,
                margin: 1,
                errorCorrectionLevel: 'H',
                color: {
                    light: '#ffffff',
                    dark: '#000000'
                }
            }, (err) => {
                if (err) {
                    console.error(err);
                } else {
                    // Add logo to the center of the QR code
                    const context = qrCodeCanvas.getContext('2d');
                    const logo = new Image();
                    logo.src = QrLogo;
                    
                    logo.onload = () => {
                        const logoWidth = 40; // Width of the logo
                        const logoHeight = 40; // Height of the logo
                        const padding = 10; // Amount of padding (whitespace) around the logo
                        
                        // Calculate coordinates for placing the logo
                        const x = (qrCodeCanvas.width - (logoWidth + padding * 2)) / 2;
                        const y = (qrCodeCanvas.height - (logoHeight + padding * 2)) / 2;
                        
                        // Draw white square as padding around the logo
                        context.fillStyle = '#ffffff';
                        context.fillRect(x, y, logoWidth + padding * 2, logoHeight + padding * 2);
                        
                        // Draw the logo on top of the white square
                        context.drawImage(logo, x + padding, y + padding, logoWidth, logoHeight);

                        // Convert the canvas to data URL and update state
                        const dataURL = qrCodeCanvas.toDataURL('image/png');
                        setQrCodeUrl(dataURL);
                    };
                }
            });
        }
    }, [url]);

    // Function to download the QR code as PNG
    const downloadQR = () => {
        if (qrCodeUrl) {
            // Create a link element for downloading
            const link = document.createElement('a');
            link.href = qrCodeUrl;
            link.download = `${hash}.png`;
            link.click();
        } else {
            console.error('QR Code URL not found');
        }
    };

    return (
        <div className={`modal ${isOpen ? 'open' : ''}`}>
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
            </div>
            <div>
                {/* QR code canvas */}
                <canvas id="qr-code-canvas" />
            </div>
            <div className="download-btn">
                <button onClick={downloadQR}>Download as PNG</button>
            </div>
        </div>
    );
};

export default QRModal;
