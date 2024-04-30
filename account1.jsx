// this keeps a running total of deposits and withdrawal
const ATMDeposit = ({ onChange, isDeposit, atmMode }) => {
  const choice = ["Deposit", "Cash Back"];
  console.log(`ATM isDeposit: ${isDeposit}`);
  if (atmMode === "") {
    return <div></div>;
  } else {
    return (
      <div>
        <label className="label huge">
          <h3> {choice[Number(!isDeposit)]}</h3>
          <input
            id="number-input"
            type="number"
            width="200"
            onChange={onChange}
          ></input>
          <input
            type="submit"
            width="200"
            value="Submit"
            id="submit-input"
          ></input>
        </label>
      </div>
    );
  }
};

const Account = () => {
  const [accountState, setAccountState] = React.useState(0);
  const [deposit, setDeposit] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [atmMode, setAtmMode] = React.useState("");
  console.log(`isDeposit in account: ${isDeposit}`);

  const handleChange = (event) => {
    console.log(`handleChange ${event.target.value}`);
    setDeposit(Number(event.target.value));
  };
  const handleSubmit = (event) => {
    let newTotal = isDeposit ? accountState + deposit : accountState - deposit;
    //alert(`Account total = ${newTotal}`);
    setAccountState(newTotal);
    event.preventDefault();
  };
  const handleModeSelect = (event) => {
    const selectvalue = event.target.value;
    setAtmMode(selectvalue);
    if (selectvalue === "Deposit") {
      setIsDeposit(true);
    } else if (selectvalue === "Cash Back") {
      setIsDeposit(false);
    }

    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Account Balance {accountState}</h2>
      <label>Select an action below to continue</label>
      <select
        onChange={(e) => handleModeSelect(e)}
        name="mode"
        id="mode-select"
      >
        <option id="no-selection" value=""></option>
        <option id="deposit-selection" value="Deposit">
          Deposit
        </option>
        <option id="cashback-selection" value="Cash Back">
          Cash Back
        </option>
      </select>

      <ATMDeposit
        onChange={handleChange}
        isDeposit={isDeposit}
        atmMode={atmMode}
      ></ATMDeposit>
    </form>
  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById("root"));
