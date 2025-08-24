import React from "react";

interface UserDetailProps {
  title: string;
  info: string | number;
}

const UserDetail: React.FC<UserDetailProps> = ({ title, info }) => {
  const infoStr = info.toString();
  const titleUpper = title.toLocaleUpperCase(title);
  return (
    <div>
      {" "}
      {titleUpper}
      <div className="infoStyle">{infoStr}</div>
    </div>
  );
};

export default UserDetail;
