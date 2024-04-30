// this keeps a running total of deposits and withdrawal
const ATMDeposit = ({ onChange, isDeposit }) => {
  const choice = ["Deposit", "Cash Back"];
  console.log(`ATM isDeposit: ${isDeposit}`);
  return (
    <label className="label huge">
      <h3> {choice[Number(!isDeposit)]}</h3>
      <input
        id="number-input"
        type="number"
        width="200"
        onChange={onChange}
      ></input>
      <input type="submit" width="200" value="Submit" id="submit-input"></input>
    </label>
  );
};

const Account = () => {
  const [accountState, setAccountState] = React.useState(0);
  const [deposit, setDeposit] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
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

  return (
    <form onSubmit={handleSubmit}>
      <h2>Account Balance {accountState}</h2>

      <button
        onClick={(event) => {
          setIsDeposit(true);
          event.preventDefault();
        }}
      >
        Deposit
      </button>
      <button
        onClick={(event) => {
          setIsDeposit(false);
          event.preventDefault();
        }}
      >
        Cash Back
      </button>

      <ATMDeposit onChange={handleChange} isDeposit={isDeposit}></ATMDeposit>
    </form>
  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById("root"));
