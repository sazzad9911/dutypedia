import { combineReducers, createStore } from "redux";
import bottomSheet from "./Reducers/bottomSheet";
import bottomRef from "./Reducers/bottomRef";
import allData from "./Reducers/allData";
import listData from "./Reducers/listData";
import length from "./Reducers/length";
import businessForm from "./Reducers/businessForm";
import user from "./Reducers/user";
import vendorInfo from "./Reducers/vendorInfo";
import newListData from "./Reducers/newListData";
import vendor from "./Reducers/vendor";
import serviceSettings from "./Reducers/serviceSettings";
import interestCategory from "./Reducers/interestCategory";
import storeVendorData from "./Reducers/storeVendorData";
import isDark from "./Reducers/isDark";
import ListSelection from "./Reducers/ListSelection";
import { socket } from "./Class/socket";
import orderSocket from "./Reducers/orderSocket";
import orders from "./Reducers/orders";
import orderState from "./Reducers/orderState";
import userOrders from "./Reducers/userOrders";
import vendorOrders from "./Reducers/vendorOrders";
import packages from "./Reducers/packages";
import statusBar from "./Reducers/statusBar";
import hideBottomBar from "./Reducers/hideBottomBar";
import isOffline from "./Reducers/isOffline";
import callingScreen from "./Reducers/callingScreen";
import orderListFilter from "./Reducers/orderListFilter";
import offlineOrders from "./Reducers/offlineOrders";
import saveList from "./Reducers/saveList";
import unReadNotification from "./Reducers/unReadNotification";
import orderRef from "./Reducers/orderRef";
import searchOrderRef from "./Reducers/searchOrderRef";
import chatSearchRef from "./Reducers/chatSearchRef";
import chatBottomRef from "./Reducers/chatBottomRef";

const combine = combineReducers({
  bottomSheet: bottomSheet,
  bottomRef: bottomRef,
  allData: allData,
  listData: listData,
  length: length,
  businessForm: businessForm,
  user: user,
  vendorInfo: vendorInfo,
  newListData: newListData,
  vendor: vendor,
  serviceSettings: serviceSettings,
  interestCategory: interestCategory,
  storeVendorData: storeVendorData,
  isDark: isDark,
  ListSelection: ListSelection,
  socket:socket,
  orderSocket:orderSocket,
  orders:orders,
  orderState:orderState,
  userOrders:userOrders,
  vendorOrders:vendorOrders,
  packages:packages,
  statusBar:statusBar,
  hideBottomBar:hideBottomBar,
  isOffline:isOffline,
  callingScreen:callingScreen,
  orderListFilter:orderListFilter,
  offlineOrders:offlineOrders,
  saveList:saveList,
  unReadNotification:unReadNotification,
  orderRef:orderRef,
  searchOrderRef:searchOrderRef,
  chatSearchRef:chatSearchRef,
  chatBottomRef:chatBottomRef
});
const store = createStore(combine);
export default store;
