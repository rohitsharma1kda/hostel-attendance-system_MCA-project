import { db } from "../../../firebase-config";
import { doc, updateDoc, getDoc, deleteDoc } from "firebase/firestore";
import { toast } from "react-toastify";
toast.configure();

export const approveONOFF = async (id) => {
  const userDoc = doc(db, "hostel8/users/clients", id);
  const docSnap = await getDoc(userDoc);
  try {
    if (docSnap.data().approved === true) {
      await updateDoc(userDoc, { approved: false });
      toast.error("Disapproved", { position: toast.POSITION.TOP_CENTER });
    } else {
      await updateDoc(userDoc, { approved: true });
      toast.success("Approved", { position: toast.POSITION.TOP_CENTER });
    }
  } catch (e) {
    toast.error(e.message.substring(0, e.message.indexOf(":")), {
      position: toast.POSITION.TOP_CENTER,
    });
  }
};

export const editONOFF = async (id) => {
  const userDoc = doc(db, "hostel8/users/clients", id);
  const docSnap = await getDoc(userDoc);
  if (docSnap.data().canEdit === true) {
    await updateDoc(userDoc, { canEdit: false });
    toast.error("Edit Permissions Removed", {
      position: toast.POSITION.TOP_CENTER,
    });
  } else {
    await updateDoc(userDoc, { canEdit: true });
    toast.success("Edit Permissions Given", {
      position: toast.POSITION.TOP_CENTER,
    });
  }
};

export const deleteUser = async (id) => {
  const userDoc = doc(db, "hostel8/users/clients", id);
  try {
    if (window.confirm("Are you sure?") === true) {
      await deleteDoc(userDoc);
      toast.error("Deleted", { position: toast.POSITION.TOP_CENTER });
    } else {
      toast.info("Process Cancelled", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  } catch (e) {
    toast.error(e.message.substring(0, e.message.indexOf(":")), {
      position: toast.POSITION.TOP_CENTER,
    });
  }
};
