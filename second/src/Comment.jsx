function Avatar(props) {
  return (
    <p className="img" src={props.user.avtSrc} alt={props.user.firstName}>{props.user.avtSrc}</p>
  )
}
const UserInfo = (props) => {
  return (
    <div className="userinfo">
      <Avatar user={props.user} />
      <h2>{props.user.firstName}</h2>
    </div>
  )
}
function Comment(props) {
  return (
    <div className="comment">
      <UserInfo user={props.author} />
      {/* Truyền props author, đồng thời đổi tên thành user */}
      <h3>{props.age}</h3>
    </div>
  )
}

export default Comment
