import Vue from "vue";
import {
  ButtonGroup,
  Button,
  Container,
  Header,
  Main,
  Aside,
  Dialog,
  Input,
  InputNumber,
  autocomplete,
  Select,
  Form,
  Drawer,
  FormItem,
  Tooltip,
  Switch,
  InfiniteScroll,
  Message,
  Loading,
  MessageBox,
  Table,
  TableColumn,
  Row,
  Col,
  Tree,
  dropdown,
  DropdownMenu,
  DropdownItem,
  Popover,
  Option,
} from "element-ui";
import { NIcon, NModel, NDrawer } from "@/components/index";
import VTooltip from "v-tooltip";
import VueClipboard from "vue-clipboard2";
Vue.prototype.$message = Message;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$confirm = MessageBox.confirm;
const components = [
  Popover,
  dropdown,
  DropdownMenu,
  DropdownItem,
  Tree,
  Option,
  Row,
  Col,
  TableColumn,
  Table,
  Loading,
  ButtonGroup,
  InfiniteScroll,
  Switch,
  Tooltip,
  FormItem,
  Form,
  Drawer,
  Button,
  Container,
  Header,
  Main,
  Aside,
  Dialog,
  Input,
  InputNumber,
  autocomplete,
  Select,
  NIcon,
  NModel,
  NDrawer,
  VTooltip,
  VueClipboard,
];
components.forEach((c) => Vue.use(c));
