import {useEffect} from 'react'

export default function NotFound({setNavbarData}) {
  
  useEffect(() => {
    setNavbarData({
      title: "404",
      bg_color: "#990000",
      shade: true,
    });
  }, [setNavbarData]);

  return (
    <div>You are lost</div>
  )
}
