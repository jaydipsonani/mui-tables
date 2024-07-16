import logo from './logo.svg';
import './App.css';
import DetailListTable from './component/DetailListTable';
import SuccessFullList from './component/SuccessFullListTable';
import MyTable from './component/SuccessFullListTable';
import FailedListTable from './component/FailedListTable';
import PlanListTable from './component/PlansListTable';
import EsimListTable from './component/EsimListTable';
import UserTable from './component/UsersTable';
import CancelRequest from './component/CancelRequestTable';
// import DataTable from './Table';

function App() {
  return (
    <div className="App">
      {/* <DataTable /> */}
      {/* <DetailListTable /> */}
      <SuccessFullList />
      {/* <FailedListTable /> */}
      {/* <PlanListTable /> */}
      {/* <EsimListTable /> */}
      {/* <UserTable /> */}
      {/* <CancelRequest /> */}
    </div>
  );
}

export default App;
