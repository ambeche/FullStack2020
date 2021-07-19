import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const User = ({ data }) => {
  const user = data;
  const style = {
    paddingTop: 10,
    paddingLeft: 2,
    marginBottom: 5,
    width: '20%',
  };
  const itemStyle = {padding: 5}

  return (
    <div style={style}>
      <span style={itemStyle}>
        {user.name}
      </span>
      <span style={{...itemStyle, textAlign: 'center', float: 'right'}}>
        {user.numberOfBlogs}
      </span>
    </div>
  );
};

export default User;
