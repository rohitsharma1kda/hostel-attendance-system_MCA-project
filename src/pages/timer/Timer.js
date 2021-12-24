import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db } from "../../firebase-config";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { ColorButtonCyan, ColorButtonRed } from "../approval/ApprovalStyle";
toast.configure();

function Timer() {
  
  const displayText = async () => {
    const userDoc = doc(db, "hostel8", "constraints");
    const docSnap = await getDoc(userDoc);
    if (docSnap.data().active === true) {
      toast.success("ACTIVE", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      toast.error("INACTIVE", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const setONOFF = async () => {
    const userDoc = doc(db, "hostel8", "constraints");
    const docSnap = await getDoc(userDoc);
    if (docSnap.data().active === true) {
      await updateDoc(userDoc, { active: false });
      toast.error("Turned OFF", { position: toast.POSITION.TOP_CENTER });
    } else {
      await updateDoc(userDoc, { active: true });
      toast.success("Turned ON", { position: toast.POSITION.TOP_CENTER });
    }
  };

  return (
    <div>
      <h3>TURN ATTENDANCE ON/ OFF</h3> <br />
      <ColorButtonCyan
        style={{ marginLeft: 40, marginTop: 30 }}
        size="large"
        variant="contained"
        onClick={displayText}
      >
        Status
      </ColorButtonCyan>
      <ColorButtonRed
        style={{ marginLeft: 40, marginTop: 30 }}
        size="large"
        variant="contained"
        onClick={setONOFF}
      >
        TOGGLE STATUS
      </ColorButtonRed>
    </div>
  );
}

export default Timer;
