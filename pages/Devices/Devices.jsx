import Sidebar from "../../src/components/Sidebar/Sidebar";
import TableDevices from "../../src/components/TableDevice/TableDevices";

export default function Devices() {
  
  return (
    <div className="devices">  
        <TableDevices />
        <Sidebar page={'/devices'}/>
    </div>
  )
}

