import React,{useState} from "react";
import Country from "./Country";

const Countries = (props) => {
  const [showAll, setShowAll] = useState(new Array(props.countries.length).fill(0));
  console.log(props)

  if (props.countries.length  === 1){
    return(<Country country={props.countries[0]}/>)
  } else if (props.countries.length > 10){
    return(
      <p>
        Too many matches, specify another filter
      </p>
    )
  }

  return (
    <div>
    {props.countries.map((country,index) => {
    //  console.log('country',country,'index',index);
      return(
        <Country country={country} show={showAll[index]}/>)
    })}
   </div>
  );
};
export default Countries;
