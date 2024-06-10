import React, { useState, useEffect } from 'react';
import {nanoid} from 'nanoid';
import QRModal from './QRModal';
import SERVER_URL  from './URL';
function URLShortener() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [copiedMessage, setCopiedMessage] = useState('');
  const [showModal, setShowModal] = useState('');
  
 const generateShortUrl = () => {
    const hash = nanoid(7); 
    return hash;

};  


const handleKeydown = async (e) => {
  if(e.key ==='Enter') {
    handleSubmit();
  }  
} 

const handleCopy = () => {
    try {
    navigator.clipboard.writeText(shortenedUrl);
    setCopiedMessage('Copied!');
  } catch {
    alert('Please provide a URL to shorten');
  }
};

useEffect(() => {
  if (copiedMessage) {
    const timer = setTimeout(() => {
      setCopiedMessage('');
    }, 2000); // Adjust the duration (in milliseconds) as needed
    return () => clearTimeout(timer);
  }
}, [copiedMessage]);

const handleQR = () => {

  if (shortenedUrl.trim() !== ''){
    setShowModal(true);
  }

  
};

const handleCloseModal = () => {
  setShowModal(false);
};


const saveUrlPair = async (originalUrl, shortenedUrl) => {
  try {
    console.log(originalUrl);
    console.log(shortenedUrl);
    const response = await fetch(`${SERVER_URL}/save-urls`, { 
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ originalUrl, shortenedUrl }),
    }
    );
    if (response.ok) {
     console.log('URL pair saved to DB' );
    } else {
      console.error('Failed to save URL pair to DB');
    }
  } catch (error) {
    console.error('Error while saving URL pair:', error);
  }
};

const checkLongUrl = async (url) => {
  try {
    const parsedUrl = new URL(url);
    // If the URL parsing succeeds, URL is considered valid
    return true;
  } catch (error) {
    // If parsing fails, the URL is considered invalid
    alert("Error. Invalid URL. Please provide a valid URL");
    return false;
  }
};


const handleSubmit = async () => {
  const originalUrlInput = document.getElementById('longUrl');
  const originalUrl = originalUrlInput.value;
      try{
        const isValidUrl = await checkLongUrl(originalUrl);  
        if(isValidUrl){
          const shortUrl = generateShortUrl();
          const fullShortUrl = `http://localhost:5000/${shortUrl}`; //4necotech.in/${shortUrl}
          // console.log("Full short url",fullShortUrl)
          setShortenedUrl(fullShortUrl); 
          navigator.clipboard.writeText(fullShortUrl);
          setCopiedMessage('Copied!');
          saveUrlPair(originalUrl, shortUrl);
          }
        }catch (error){
          console.error("Error validating the URL");
        }
};

let qrName = shortenedUrl.slice(-7);

function handleSubmitandCopy(){
  handleSubmit();
  setTimeout(() => {
    handleCopy();
}, 1000);
}

  return (
    <div className="url-shortener-container">
      <div className="input-container">
        <input
          type="text"
          placeholder="Shorten a URL with 4N"
          value={originalUrl}
          id="longUrl"
          
          onChange={(e) => setOriginalUrl(e.target.value)}
          onKeyDown={handleKeydown}
        />
      </div>
      <div className="output-container">
        <input id = "name" type="text" value={shortenedUrl} readOnly/><div className='icons'>
        <img className='qr-icon' src="./QR.png" alt='' onClick={handleQR} ></img>          
        <QRModal isOpen={showModal} onClose={handleCloseModal} url={shortenedUrl} hash={qrName} />
        <img className='copy-icon' src="./copy.png" alt='' onClick={handleSubmitandCopy}></img> 
        </div>
        <button className="shorten-button" onClick={handleSubmit} >
          Shorten
        </button>
      </div>
      {copiedMessage && <p>{copiedMessage}</p>}
    </div>
  
  );
}

export default URLShortener;
