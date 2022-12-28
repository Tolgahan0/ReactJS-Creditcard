const sc = styled.default;

const App = () => {
  const initialState = {
    name: 'Your name',
    number: '0000000000000000',
    month: 'xx',
    year: 'xx',
    cvc: 'CVC' };


  const [creditCardData, setCreditCardData] = React.useState(initialState);

  const clearNumber = (value = "") => {
    return value.replace(/\D+/g, "");
  };

  const formatCreditCardNumber = value => {
    if (!value) {
      return value;
    }

    const clearValue = clearNumber(value);

    let nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(4, 8)} ${clearValue.slice(8, 12)} ${clearValue.slice(12, 19)}`;

    return nextValue.trim();
  };

  const validateNumberInput = e => {
    let value = e.target.value;
    const rep = /[-\.;":'a-zA-Zа-яА-Я]/;
    if (rep.test(value)) {
      value = value.replace(rep, '');
      e.target.value = value;
    }
  };

  const flip = () => {
    const element = document.querySelector('.card');
    if (element.style.transform == "rotateY(180deg)") {
      element.style.transform = "rotateY(0deg)";
    } else {
      element.style.transform = "rotateY(180deg)";
    }
  };

  const flipWithInputs = () => {
    const element = document.querySelector('.card');
    element.style.transform = "rotateY(0deg)";
  };

  const flipWithCVC = () => {
    const element = document.querySelector('.card');
    element.style.transform = "rotateY(180deg)";
  };

  const onInputChange = (e, name) => {
    if (e.target.value) {

      setCreditCardData({ ...creditCardData, [name]: e.target.value });
    } else {
      setCreditCardData({ ...creditCardData, [name]: initialState[name] });
    }
  };

  return  (
    React.createElement(Container, null,  
    React.createElement(CreditCardWrapper, { className: "card", onClick: flip },  
    React.createElement("div", { className: `callout credit` },   
    React.createElement(CreditCardFrontHeader, null,  
    React.createElement("div", { className: "rccs-chip" }),   
    React.createElement("div", { className: "rccs-issuer" })),  

    React.createElement(CreditCardFrontNumber, null,  
    React.createElement("p", null,
    formatCreditCardNumber(creditCardData.number))),  


    React.createElement(CreditCardFrontFooter, null,  
    React.createElement("div", null,  
    React.createElement(CreditCardFrontHolderName, null,  
    React.createElement("p", null,  React.createElement("b", null, creditCardData.name)))), /*#__PURE__*/


    React.createElement("div", null,  
    React.createElement(CreditCardFrontExpireDate, null, "valid thru",  
    React.createElement("p", null,
    creditCardData.month, " / ", creditCardData.year))))),  





    React.createElement(CreditCardBack, { className: `callout credit` },  
    React.createElement(CreditCardStripe, null), 
    React.createElement(CreditCardSignature, null), 
    React.createElement(CreditCardSVC, null, creditCardData.cvc), 
    React.createElement("div", { className: "rccs-issuer" }))),   


    React.createElement(FormContainer, { className: "callout" },  
    React.createElement("label", null, "Card Holder", 
    React.createElement("input", {
      type: "text",
      onClick: flipWithInputs,
      onChange: e => onInputChange(e, 'name') })), 


    React.createElement("label", null, "Number", 
    React.createElement("input", {
      type: "text",
      onKeyUp: e => validateNumberInput(e),
      onClick: flipWithInputs,
      maxLength: "16",
      onChange: e => onInputChange(e, 'number') })), 


    React.createElement("label", null, "Expiration (mm/yy)"), 
    React.createElement("div", { style: { display: 'flex' } }, 
    React.createElement("div", null, 
    React.createElement("input", {
      type: "text",
      onClick: flipWithInputs,
      onKeyUp: e => validateNumberInput(e),
      maxLength: "2",
      onChange: e => onInputChange(e, 'month'),
      placeholder: "Month" })), 


    React.createElement("div", null, 
    React.createElement("input", {
      type: "text",
      onClick: flipWithInputs,
      onKeyUp: e => validateNumberInput(e),
      maxLength: "2",
      onChange: e => onInputChange(e, 'year'),
      placeholder: "Year" }))), 



    React.createElement("div", null, 
    React.createElement("div", null, 
    React.createElement("label", null, "CVC", 
    React.createElement("input", {
      type: "text",
      pattern: "[0-9]*",
      onClick: flipWithCVC,
      maxLength: "4",
      onKeyUp: e => validateNumberInput(e),
      onChange: e => onInputChange(e, 'cvc') })))))));







};

const CreditCardSVC = sc.div`
  color: #222;
  font-size: 14px;
  left: 67%;
  line-height: 1;
  position: absolute;
  top: 42%;
`;

const CreditCardSignature = sc.div`
  background: repeating-linear-gradient(0.1deg, #fff 20%, #fff 40%, #fea 40%, #fea 44%, #fff 44%);
  height: 18%;
  left: 5%;
  position: absolute;
  top: 35%;
  width: 75%;
`;

const CreditCardStripe = sc.div`
  background-color: #2a1d16;
  height: 22%;
  left: 0;
  position: absolute;
  top: 9%;
  width: 100%;
`;

const CreditCardWrapper = sc.div`
  margin: 0;
  position: absolute;
  top: 70px;
  z-index: 20;
`;

const CreditCardBack = sc(CreditCardWrapper)`
  background: linear-gradient(25deg, #0f509e, #1399cd);
  top: 0;
  transform: rotateY(180deg); 
`;

const Container = sc.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  margin-top: 150px;
  align-items: center;
  padding: 20px;
`;

const FormContainer = sc.div`
  width: 75%;
  max-width: 450px;
  padding: 90px 40px 30px;
  border-radius: 15px;
  border: none;
  -webkit-box-shadow: 2px 9px 16px 8px rgba(166,166,166,1);
  -moz-box-shadow: 2px 9px 16px 8px rgba(166,166,166,1);
  box-shadow: 2px 9px 16px 8px rgba(166,166,166,1);
`;

const CreditCardFrontHeader = sc.div`
  display: flex;
  justify-content: space-between;
`;

const CreditCardFrontNumber = sc.div`
  margin-top: 40px;

  & p {
    color: #fff;
    font-size: 17px;
    letter-spacing: 3.5px;
  }
`;

const CreditCardFrontFooter = sc.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
`;

const CreditCardFrontHolderName = sc.label`
  color: #fff;
  text-transform: uppercase;
`;

const CreditCardFrontExpireDate = sc.label`
  color: #fff;
  line-height: 10px;
`;

ReactDOM.render( 
React.createElement(App, null),
document.getElementById('app'));