import "./Main.css";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { succesfulCopyMsg, FailedCopyMsg, selectAtleastOneBox, passwordGenerated } from "./UserMessage";
import {
  numbers,
  specialCharacters,
  lowerCaseLetters,
  upperCaseLetters,
} from "./Characters";
import "react-toastify/dist/ReactToastify.css";

function Main() {
  const [password, setPassword] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [passwordLength, setPasswordLength] = useState(10);
  const [includeUpperCase, setIncludeUpperCase] = useState(false);
  const [includeLowerCase, setIncludeLowerCase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);

  const handleGeneratePassword = () => {
    if (
      !includeLowerCase &&
      !includeLowerCase &&
      !includeNumbers &&
      !includeSymbols
    ) {
      notify(selectAtleastOneBox, true);
    } else {
      let characterList = "";
      if (includeLowerCase) {
        characterList += lowerCaseLetters;
      }
      if (includeUpperCase) {
        characterList += upperCaseLetters;
      }
      if (includeNumbers) {
        characterList += numbers;
      }
      if (includeSymbols) {
        characterList += specialCharacters;
      }
      setPassword(createPassword(characterList));
      notify(passwordGenerated, false);
    }
  };

  const createPassword = (characterList) => {
    let password = "";
    const characterLength = characterList.length;
    for (let i = 0; i < passwordLength; i++) {
      const randomCharacterIndex = Math.floor(Math.random() * characterLength);
      password += characterList.charAt(randomCharacterIndex);
    }

    return password;
  };

  const setPasswordInClipboard = (password) => {
    navigator.clipboard.writeText(password);
  };

  const notify = (message, hasError = false) => {
    if (hasError) {
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        icon:  "💀",
      });
    } else {
      toast(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        icon: "🚀",
      });
    }
  };

  function handleCopyPassword() {
    if (!password) {
      notify(FailedCopyMsg, true);
    } else if (!isCopied) {
      notify(succesfulCopyMsg);
      setPasswordInClipboard(password);
    }
  }

  return (
    <div class="container">
      <div className="generator">
        <h1 className="generator-header">Password Generator</h1>
        <div className="generator-password">
          <input type="text" value={password} readOnly className="display-password" />
          <button
            className="copy__btn"
            onClick={() => {
              setIsCopied(!isCopied);
              handleCopyPassword();
            }}
          >
            {isCopied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
      <div className="character-select-form">
        <div className="form-group">
          <label>Select the expected length of your Password. </label>
          <input className="password-length"
            type="number"
            defaultValue={passwordLength}
            onChange={(e) => setPasswordLength(e.target.value)}
            name="password-length"
          />
        </div>
        <div className="form-group">
          <label>Do you Want to Include Numbers in your Password ? </label>
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
            name="include-numbers"
          />
        </div>
        <div className="form-group">
          <label>
            Do you Want to Include Upper Case Letters in your Password ?{" "}
          </label>
          <input
            type="checkbox"
            checked={includeUpperCase}
            onChange={(e) => setIncludeUpperCase(e.target.checked)}
            name="include-upper-case"
          />
        </div>
        <div className="form-group">
          <label>
            Do you Want to Include Lower Case Letters in your Password ?{" "}
          </label>
          <input
            type="checkbox"
            checked={includeLowerCase}
            onChange={(e) => setIncludeLowerCase(e.target.checked)}
            name="include-lower-case"
          />
        </div>
        <div className="form-group">
          <label>Do you Want to Include Symbols in your Password ? </label>
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={(e) => setIncludeSymbols(e.target.checked)}
            name="include-symbols"
          />
        </div>
        <button
          onClick={() => {
            handleGeneratePassword();
            setIsCopied(false);
          }}
          className="generator__btn"
        >
          Generate Password
        </button>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default Main;
