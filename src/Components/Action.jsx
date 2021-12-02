function Action({ number, action, add, multiply }) {
  let result =
    action === "add" ? number + add?.value : number * multiply?.value;
  // result number

  let actionNumber = action === "add" ? add?.value : multiply?.value;
  let actionSyntax = action === "add" ? "+" : "*";
  // result shown action

  if ((action === "add" && !add) || (action === "multiply" && !multiply))
    return <span>{"<MISSING DATA>"}</span>;
  // handle undifind action number

  return (
    <span>
      {`${number} ${actionSyntax} ${actionNumber} = `}
      <span data-testid="result-card-number">{result}</span>
    </span>
  );
}

export default Action;
