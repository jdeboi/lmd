// <div className="Chat-participants">
//   <div className="Chat-title">
//     <div className="Chat-title-participants">
//       <div className="Panel-title">in the room</div>
//       <div className="Chat-user">{(userHover?userHover.userName:"")}</div>
//     </div>
//   </div>
//   <div className="Chat-emojis">
//     <div className="Chat-emojis-box">
//       {users.map((user, i) => {
//         return (
//           <div key={i} onClick={() => this.setRecipient(user)} onMouseEnter={() => this.setUserHover(user)} onMouseLeave={() => this.setUserHoverLeave()}>{user.avatar}</div>
//         )
//       })}
//     </div>
//   </div>
//   {/*<div className="Chat-user">
//     <SmallTextField
//     disabled
//     id="filled-disabled"
//     label=""
//     value={"user: " + (userHover?userHover.userName:"")}
//     InputProps={{
//     readOnly: true
//     }}
//     />
//     </div>*/
//   }
// </div>
