
export default function ChatForm(props) {

  return(
    <div className="Chat-form">
      <ComboBox {...props}  />
      <TextField
        label=""
        id="margin-dense"
        className={classes.textField + " form-item"}

        fullWidth
        placeholder="message"
        variant="outlined"
        value={this.state.textBox}
        onChange={this.handleTextBoxChange}
        />
      <Button variant="outlined" className="form-item" disabled={this.state.buttonDisabled} onClick={this.onSubmit}>send</Button>
    </div>
  )
}
