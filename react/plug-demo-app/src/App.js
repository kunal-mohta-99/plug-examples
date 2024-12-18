import './App.css';
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    let session_token = null;

    /**
     * Uncomment the below code if you want to try the verified user identification flow.
     * This code makes a synchronous auth-tokens.create API call to get the user session token.
     * This should be done in BACKEND ONLY. DO NOT DO THIS IN FRONTEND. It is done in FRONTEND here for demonstration purposes.
     */
    // // synchronous API call to get user session token
    // const xhr = new XMLHttpRequest();
    // const url = 'https://api.dev.devrev-eng.ai/internal/auth-tokens.create';
    // xhr.open('POST', url, false);
    // xhr.setRequestHeader('accept', 'application/json, text/plain, */*');
    // xhr.setRequestHeader('authorization', 'Bearer <your_application_access_token>');
    // xhr.setRequestHeader('content-type', 'application/json');
    // const payload = JSON.stringify({"rev_info": {
    //   "user_ref": "test_user_ref",
    //   "user_traits": {
    //     "email": "test@gmail.com",
    //     "display_name": "Test User"
    //   }
    // }});
    // xhr.send(payload);
    // session_token = JSON.parse(xhr.responseText).access_token;

    // Initializing PLuG
    window.plugSDK.init({
      app_id: "<your_unique_app_id>", // get this from Settings > Support > PLuG Settings
      enable_session_recording: true, // can be set from PLuG settings API as well
      session_recording_key: "<your_session_recording_key>", // get this from UE app; can be set from PLuG settings API as well
      session_recording_options: { // recording options
        sessionReplay: {
          maskAllInputs: false,
          maskInputOptions: {
            email: true,
          },
          captureMouseMove: true,
        }
      },
      session_token: session_token,
      _env: 'DEV', // only required when testing in DEV env
    });
  }, []);

  const trackFormData = (event) => {
    const name = document.getElementById('input-name').value;
    const email = document.getElementById('input-email').value;
    
    // tracking custom events
    window.plugSDK.trackEvent('form_data', { name, email });
  };

  return (
    <div className="App">
      <h1>PLuG Training - React page</h1>

      {/* this input is not masked */}
      <input type="text" placeholder="Enter your name" id="input-name" />

      {/* this input is masked, because session_recording_options.maskInputOptions.email is true */}
      <input type="email" placeholder="Enter your email" id="input-email" />

      <button onClick={trackFormData}>Click me to track an event</button>

      <br />

      <div>I am not masked</div>

      {/* 'ue-mask' CSS class is used to mask HTML elements  */}
      <div className="ue-mask">I am masked</div>

      <br />

      {/* password input fields are masked by default  */}
      <input type="password" placeholder="password field is masked by default" />

      {/* 'ue-input-mask' CSS class is used to mask specific input elements  */}
      <input className="ue-input-mask" placeholder="I am masked" />

      {/* 'ue-block' CSS class is used when we don't even want the SDK to know the input  */}
      <input className="ue-block" placeholder="I am blocked" />
    </div>
  );
}

export default App;
