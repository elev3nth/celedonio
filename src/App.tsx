import React, { useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import CryptoJS from "crypto-js";
import Axios from 'axios';
import './App.css';

function App() {
  
  const IpAddr = process.env.REACT_APP_IP_ADDRESS;
  const HostNm = process.env.REACT_APP_HOST_NAME;
  const Apikey = process.env.REACT_APP_API_KEY;  
  const ApiUrl = process.env.REACT_APP_API_URL; 
  const ReCaptchaKey = process.env.REACT_APP_RECAPTCHA_SITE_KEY;    
  const PublicUrl = new URL(process.env.PUBLIC_URL!, window.location.toString());
  
  const [enquiryName, setEnquiryName] = useState("");
  const [enquiryEmail, setEnquiryEmail] = useState("");
  const [enquirySubject, setEnquirySubject] = useState("");
  const [enquiryMessage, setEnquiryMessage] = useState("");   
  const [enquiryToken, setEnquiryToken] = useState((value) => {
    return value;
  });
   
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();  
    if (enquiryEmail.length && enquiryEmail.length && enquiryMessage.length) {      
      var enquiryUrl = ApiUrl + 'sendmail';      
      var enquiryData = JSON.stringify([{
        pkey: Apikey,
        host: PublicUrl.host,
        body: {
          nme: enquiryName,
          eml: enquiryEmail,
          sbj: enquirySubject,
          msg: enquiryMessage,
          tkn: enquiryToken
        }
      }]);
      var enquiryCode = btoa(JSON.stringify({
        'addr': IpAddr,
        'host': HostNm
      })).toString();
      var enquiryEncr = CryptoJS.AES.encrypt(enquiryData, Apikey).toString();      
      try {
        await Axios.get(enquiryUrl + '?' + encodeURI(enquiryCode) + '~' + encodeURI(enquiryEncr))
        .then((response) => {
          console.log(response);
        });         
      } catch (error) {
        console.error(error);
      }
    }
  }     
  
  return (
    <div className="App">
      <div className="content w-[100%] flex-none px-[1em] pt-[2em] lg:flex lg:px-[2em] lg:py-[8em] transition-opacity ease-in duration-100 opacity-100">
        <div className="socials block lg:absolute lg:top-[7.5em] lg:left-[7.5em]">
          <a className="icon text-[30px]"
              href="https://www.facebook.com/APCeledonio"
              target="_blank"
              rel="noopener noreferrer"><i className="fab fa-facebook"></i>
          </a>
          <a className="icon text-[30px]"
              href="https://twitter.com/allanceledonio"
              target="_blank"
              rel="noopener noreferrer"><i className="fab fa-twitter"></i>
          </a>
          <a className="icon text-[30px]"
              href="https://www.linkedin.com/in/allan-celedonio-814b26115/"
              target="_blank"
              rel="noopener noreferrer"><i className="fab fa-linkedin"></i>
          </a>
          <a className="icon text-[30px]"
              href="https://github.com/elev3nth"
              target="_blank"
              rel="noopener noreferrer"><i className="fab fa-github"></i>
          </a>
          <a className="icon text-[30px]"
              href="https://www.npmjs.com/~eleventh"
              target="_blank"
              rel="noopener noreferrer"><i className="fab fa-npm"></i>
          </a>
        </div>
        <div className="box shrink-0 pt-[0] lg:pt-[1.5em]">
          <img src="/pc.png" alt="slide" className="slide lg:h-auto lg:max-w-full" />
        </div>
        <div className="box content-center shrink-1 p-[0 auto] mb-[3em] lg:mb-[0] lg:p-[0.5em] lg:text-left">
          <h1 className="
            text-[3em] py-[0.2em] pb-[0.2em] leading-[1em] 
            lg:leading-[0.78em] lg:text-[10em] lg:pb-[0.1em]
          ">
            Digitizing ideas into the web
          </h1>
          <h2 className="text-[1em] lg:text-[1.3em]">
            Fullstack developer with a passion for innovation and scalable applications.
            </h2>
          <h2 className="text-[1em] lg:text-[1.3em]">
            Let's build something awesome! Flick me an email on&nbsp;  
            <span>
              <b>Allan@Celedonio.Digital</b>
            </span>
          </h2>
          <h2 className="text-[1em] lg:text-[1.3em]">
            You can also just click the button below for enquiries and quotes.
          </h2>
          <a href="#contact" id="contactBtn" className="
            rounded-full text-[1.3em] mt-2
            lg:text-[1.8em]        
          ">Contact Us</a>
        </div>          
      </div>  
      <div id="contact"className="contact">      
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-200">Contact Us</h2>
            <p className="mb-8 lg:mb-16 font-light text-center text-gray-200 md:text-xl">
              Need website/app quotation or any enquiry about Celedonio.Digital? Let us know.
            </p>
            <form action="#" className="space-y-8" onSubmit={handleSubmit}>
              <div>                    
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-200 text-left">
                      Your Fullname
                    </label>
                    <input type="name" 
                      value={enquiryName}
                      onChange={(e) => setEnquiryName(e.target.value)}
                      id="name" className="
                      shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                      focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 
                      dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                      dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" 
                      placeholder="John Doe" required />
                </div>
                <div>                    
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-200 text-left">
                      Your Email
                    </label>
                    <input type="email" 
                      value={enquiryEmail}
                      onChange={(e) => setEnquiryEmail(e.target.value)}
                      id="email" className="
                      shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                      focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 
                      dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                      dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" 
                      placeholder="jonh.doe@email.com" required />
                </div>
                <div>
                    <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-200 text-left">
                      Subject
                    </label>
                    <input type="text" 
                      value={enquirySubject}
                      onChange={(e) => setEnquirySubject(e.target.value)}
                      id="subject" className="
                      block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 
                      shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 
                      dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 
                      dark:focus:border-primary-500 dark:shadow-sm-light" 
                      placeholder="Let us know how we can help you" required />
                </div>
                <div className="sm:col-span-2">
                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-200 text-left">
                      Your Message
                    </label>
                    <textarea 
                      value={enquiryMessage}
                      onChange={(e) => setEnquiryMessage(e.target.value)}
                      id="message" rows={6} className="
                      block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border 
                      border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 
                      dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 
                      dark:focus:border-primary-500" placeholder="Leave your enquiry here..."></textarea>
                </div>
                <div className="sm:col-span-2 px-[1em] lg:px-[14em]">
                  <ReCAPTCHA                    
                    sitekey={ReCaptchaKey}
                    onChange={setEnquiryToken}
                  />                 
                </div>
                <button type="submit" id="sendBtn" className="
                  py-3 px-5 text-sm font-medium text-center text-gray-500 rounded-lg bg-gray-600  
                  hover:bg-primary-800 hover:text-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 
                  md:w-fit">Send Enquiry</button>                                
            </form>
        </div>        
      </div>             
    </div>
  );
}

export default App;
