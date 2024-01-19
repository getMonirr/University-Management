import { Layout, Menu } from "antd";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { adminPaths } from "../../routes/admin.routes";
import { facultyPaths } from "../../routes/faculty.routes";
import { studentPaths } from "../../routes/student.routes";
import { userRole } from "../../types";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";

const { Sider } = Layout;

const Sidebar = () => {
  const user = useSelector(selectCurrentUser);

  let sidebarItems;

  switch (user?.role) {
    case userRole.ADMIN:
      sidebarItems = sidebarItemsGenerator(adminPaths, userRole.ADMIN);
      break;
    case userRole.FACULTY:
      sidebarItems = sidebarItemsGenerator(facultyPaths, userRole.FACULTY);
      break;

    case userRole.STUDENT:
      sidebarItems = sidebarItemsGenerator(studentPaths, userRole.STUDENT);
      break;
    default:
      break;
  }

  return (
    <Sider breakpoint="lg" collapsedWidth="0">
      <div
        style={{
          color: "white",
          fontSize: "20px",
          height: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        PHU Management
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
