import React from "react";
import { ImArrowLeft, ImArrowRight } from "react-icons/im";

export const Pagination = (props) => {
  const [pageup, setpageup] = React.useState(1);

  return (
    <div class="btn-group d-flex justify-content-center">
      <button
        type="button"
        disabled={pageup <= 1}
        onClick={() => {
          if (pageup > 1) {
            props.setpage(pageup - 1);
            setpageup(pageup - 1);
          }
        }}
        
        class="btn btn-outline-info"
      >
                  <ImArrowLeft style={{color:'#ffff',padding:"0px"}}/>

      </button>

      <button type="button" disabled={true} class="btn btn-outline-info text-white">
        {props.page}
      </button>
      
      <button
        type="button"
        disabled={pageup >= props.limits}
        onClick={() => {
          props.setpage(pageup + 1);
          setpageup(pageup + 1);
        }}
        class="btn btn-outline-info"
      >
                  <ImArrowRight style={{color:'#ffff',padding:"0px"}}/>
      </button>
    </div>
  );
};
