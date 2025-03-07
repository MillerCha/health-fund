import React, { createContext, useEffect, useState } from "react";

export const MemberContext = createContext();

export const MemberProvider = ({ children }) => {

  const [member, setMember] = useState(()=>{
    const savedMember = sessionStorage.getItem('members');
    return savedMember? JSON.parse(savedMember) : null;
  });

  useEffect(() => {
    sessionStorage.setItem('member', JSON.stringify(member));
  }, [member]);

  const updateMember = (member) => {
    setMember(member);
  }


  return (
    <MemberContext.Provider value={{ member, updateMember }}>
      {children}
    </MemberContext.Provider>

  )


}