import React, { Suspense, useState, useEffect } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
	StyleSheet,
	Image,
	ScrollView,
	View,
	Text,
	TextInput,
	SafeAreaView,
	TouchableOpacity,
} from "react-native";
import CheckBox from "react-native-check-box";
import { Table, TableWrapper, Row, Cell, Col } from "react-native-table-component";
import Modal from "react-native-modal";
import { LogoHust } from "./../../logo";

import { goBack as goBackMavigation } from "../../../redux/navigationSlice";
import { useSelector, useDispatch } from "react-redux";
import { navigate } from "../../../redux/navigationSlice";
import { useNavigation as useReactNavigation } from "@react-navigation/native";
import api from "../../api";

const ManageClassesScreenGVien = () => {
	const dispatch = useDispatch();
	const navigation = useReactNavigation();

	const currentScreen = useSelector((state) => state.navigation.currentScreen);
	const param = useSelector((state) => state.navigation.params);
	//console.log(param)

	useEffect(() => {
		if (currentScreen !== "MyClassesScreenGVien") {
			navigation.navigate(currentScreen);
		}
	}, [currentScreen]);

	const [tableHead] = useState([
		"Mã lớp học",
		"Tên lớp học ",
		"Loại",
		"Ngày bắt đầu",
		"Ngày kết thúc",
		"Trạng thái",
		"Chọn",
	]);
	const [widthArr] = useState([70, 130, 80, 130, 130, 70, 70]);
	const sumTC = 16;
	const [checkedData, setCheckedData] = useState(null); // Lưu thông tin dòng đã chọn
	const [isEditEnabled, setIsEditEnabled] = useState(false); // Điều kiện để bật/tắt nút "Chỉnh sửa"
	const [tableData, setTableData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (currentScreen !== "MyClassesScreenGVien") {
            navigation.navigate(currentScreen);
        }
    }, [currentScreen]);

    useEffect(() => {
        // Hàm gọi API để lấy danh sách lớp
        const fetchClassList = async () => {
            setIsLoading(true);
            try {
                const response = await api.post("/it5023e/get_class_list", {
                    token: param.token,
                    role: param.role == 2 ? "LECTURER" : "STUDENT",
                    account_id: "24",
                    pageable_request: null,
                });
                const pageContent = response.data.data.page_content;
                // Map dữ liệu để phù hợp với cấu trúc tableData
                const formattedData = pageContent.map((item) => [
                    item.class_id,
                    item.class_name,
                    item.class_type,
                    item.start_date,
                    item.end_date,
                    item.status,
                    false, // Cột checkbox mặc định là false
                ]);
                setTableData(formattedData);
            } catch (error) {
                console.error("Error fetching class list:", error);
				console.error("Error Data:", error.response.data); 
				console.error("Error Status:", error.response.status);
            } finally {
                setIsLoading(false);
            }
        };

        fetchClassList();
    }, [currentScreen]);
	

	const [listClass, setListClass] = useState([
		{
			id_class: "103268",
			id_class_attached: "103269",
			id_subject: "PH1110",
			name_subject: "Vật lý đại cương I",
			semester: "Kỳ hè-C",
			type_class: "BT",
			status: "Đăng ký chính thức",
			credit: 80,
			number_student: 0,
			name_academic: "VVLKT",
			times: [
				{
					day_in_week: 2,
					time: "15:05-17:35",
					week_time: "47-51",
					classroom: "D9-102",
				},
				{
					day_in_week: 6,
					time: "15:05-17:35",
					week_time: "47-51",
					classroom: "D9-101",
				},
				{
					day_in_week: 5,
					time: "12:30-15:00",
					week_time: "47-51",
					classroom: "D9-101",
				},
			],
		},
		{
			id_class: "103268",
			id_class_attached: "103269",
			id_subject: "PH1110",
			name_subject: "Vật lý đại cương I",
			semester: "Kỳ hè-C",
			type_class: "BT",
			status: "Đăng ký chính thức",
			credit: 80,
			number_student: 0,
			name_academic: "VVLKT",
			times: [
				{
					day_in_week: 2,
					time: "15:05-17:35",
					week_time: "47-51",
					classroom: "D9-102",
				},
				{
					day_in_week: 6,
					time: "15:05-17:35",
					week_time: "47-51",
					classroom: "D9-101",
				},
				{
					day_in_week: 5,
					time: "12:30-15:00",
					week_time: "47-51",
					classroom: "D9-101",
				},
			],
		},
	]);

	function goBack() {
		dispatch(goBackMavigation());
	}

	function goCreateClass() {
		dispatch(
			navigate({
				screen: "CreateClassScreenGVien",
				params: param,
			})
		);
	}

	// Cập nhật trạng thái checkbox khi người dùng chọn hoặc bỏ chọn
	const selectRow = (index, cellIndex) => {
		let temp = [...tableData];
		if (cellIndex === 6) { // Cột checkbox
			// Nếu checkbox đã được chọn, bỏ chọn tất cả
			if (temp[index][cellIndex] === false) {
				// Nếu checkbox chưa được chọn thì chọn checkbox đó và bỏ các checkbox khác
				temp.forEach((row, idx) => {
					if (idx !== index) row[6] = false; // Bỏ chọn các checkbox khác
				});
				temp[index][cellIndex] = true; // Chọn checkbox tại dòng hiện tại
				setCheckedData(temp[index]); // Lưu dữ liệu của dòng đã chọn vào checkedData
			} else {
				temp[index][cellIndex] = false; // Nếu đã chọn, bỏ chọn
				setCheckedData(null); // Xóa dữ liệu khi bỏ chọn
			}
			setTableData(temp);
		}
	};

	// Kiểm tra xem có một checkbox được chọn hay không
	useEffect(() => {
		if (checkedData !== null) {
			setIsEditEnabled(true); // Nếu có dòng được chọn, bật nút "Chỉnh sửa"
		} else {
			setIsEditEnabled(false); // Nếu không có dòng nào được chọn, tắt nút "Chỉnh sửa"
		}
	}, [checkedData]);

	// Chuyển đến màn hình chỉnh sửa
	const goEditClass = () => {
		if (checkedData) {
			dispatch(
				navigate({
					screen: "EditClassScreenGVien",
					params: { ...param, classData: checkedData }, // Truyền dữ liệu lớp học vào params
				})
			);
		}
		setCheckedData(null);
	};

	const [isOpenModal, setIsOpenModal] = useState(false);

	const openModalListClass = () => {
		setIsOpenModal(true);
	};

	const closeModalListClass = (e) => {
		setIsOpenModal(false);
	};

	return (
		<ScrollView>
			<View className="bg-red-700 pt-10 pb-5 relative">
				<View className="absolute left-3 top-8">
					<TouchableOpacity onPress={() => goBack()}>
						<FontAwesome name="long-arrow-left" size={26} color="white" />
					</TouchableOpacity>
				</View>
				<View className="flex justify-center items-center">
					<LogoHust width={100} height={20}></LogoHust>
					<Text className="text-white text-[24px] pt-3">CLASS MANAGEMENT</Text>
				</View>
			</View>
			<View className="mt-10 mx-8 flex flex-row">
				<View className="basis-[55%] mx-3 bg-[#f2eceb] border-red-600 border py-2">
					<TextInput
						className=" text-red-600 text-lg px-3"
						placeholder="Mã lớp"
						placeholderTextColor={"#ad1d1d"}
					/>
				</View>
				<View className="basis-[35%] flex justify-center items-center bg-red-700 rounded-lg">
					<TouchableOpacity>
						<Text className="text-white italic font-bold text-lg">Tìm kiếm</Text>
					</TouchableOpacity>
				</View>
			</View>
			<View className="w-full ">
				<View className="p-4 pt-7 h-[400px] ">
					<ScrollView horizontal={true}>
						<View>
							<Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
								<Row
									data={tableHead}
									widthArr={widthArr}
									// style={styles.header}
									className="bg-red-600 h-11"
									textStyle={styles.textHeader}
								/>
							</Table>
							<ScrollView style={styles.dataWrapper}>
								<Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
									{tableData.map((rowData, index) => (
										<TableWrapper
											style={{
												display: "flex",
												flexDirection: "row",
											}}
										>
											{rowData.map((cellData, cellIndex) => (
												<Cell
													data={
														cellIndex === rowData.length - 1 ? (
															<CheckBox
																style={{
																	alignSelf: "center",
																	paddingBottom: 4,
																	paddingTop: 4,
																}}
																onClick={() => {
																	selectRow(index, cellIndex);
																}}
																isChecked={cellData}
															/>
														) : (
															cellData
														)
													}
													textStyle={styles.textRecoder}
													width={widthArr[cellIndex]}
												/>
											))}
										</TableWrapper>
									))}
								</Table>
							</ScrollView>
							<View className="border-t border-gray-300"></View>
						</View>
					</ScrollView>
				</View>
			</View>
			<View className="flex flex-row mt-10 justify-center gap-x-3">
				<View
					className="flex justify-center items-center
                 bg-red-700 rounded-lg px-5 py-1"
				>
					<TouchableOpacity onPress={() => goCreateClass()}>
						<Text className="text-white italic font-bold text-lg">Tạo lớp học mới</Text>
					</TouchableOpacity>
				</View>
				<View
					className="flex justify-center items-center
                 bg-red-700 rounded-lg px-5 py-1"
				>
					<TouchableOpacity 
					onPress={() => goEditClass()}
					disabled={!isEditEnabled} // Vô hiệu hóa nút khi không có checkbox nào được chọn
					style={{
						opacity: isEditEnabled ? 1 : 0.5, // Làm mờ nút khi nó bị vô hiệu hóa
					}}
					>
						<Text className="text-white italic font-bold text-lg">Chỉnh sửa</Text>
					</TouchableOpacity>
				</View>
			</View>
			<View className="flex justify-center items-center mt-8 ">
				<TouchableOpacity onPress={() => openModalListClass()}>
					<Text className="text-base text-red-600 underline font-bold italic">
						Thông tin danh sách các lớp mở
					</Text>
				</TouchableOpacity>
			</View>
			<Modal isVisible={isOpenModal} onBackdropPress={(e) => closeModalListClass(e)}>
				<View className="h-[70%] bg-gray-200 ">
					<ScrollView horizontal={true}>
						<ScrollView>
							{listClass.map((item) => {
								const header_row = [];
								header_row.push(item.id_class);
								header_row.push(item.id_subject);
								header_row.push(item.name_subject);
								header_row.push(item.semester);
								header_row.push(item.type_class);
								header_row.push(item.status);
								header_row.push(item.credit);
								header_row.push(item.number_student);
								header_row.push(item.name_academic);

								let header_row_time = [
									"Thứ",
									"Thời gian",
									"Tuần học",
									"Phòng học",
									"Mã lớp",
								];

								return (
									<View className="mb-5 pt-2">
										<Table
											borderStyle={{ borderWidth: 1, borderColor: "#a8a8a8" }}
										>
											<Row
												data={header_row}
												widthArr={[60, 60, 150, 100, 40, 90, 40, 40, 60]}
												// style={styles.header}
												className="bg-[#bfbebe]"
												textStyle={{
													textAlign: "center",
													fontWeight: "600",
													color: "black",
												}}
											/>
										</Table>
										<Text className="mt-4 mx-3">
											Tên lớp:{" "}
											<Text className="font-semibold">
												{item.name_subject}
											</Text>
										</Text>
										<Text className="mt-1 mx-3">
											Mã lớp kèm: {item.id_class_attached}
										</Text>
										<View className="mt-5">
											<Table
												borderStyle={{
													borderWidth: 1,
													borderColor: "#c1c1c1",
												}}
											>
												<Row
													data={header_row_time}
													style={{
														backgroundColor: "#d6d5d5",
														height: 40,
													}}
												/>
												{item.times.map((time) => {
													const row_time = [];
													row_time.push(time.day_in_week);
													row_time.push(time.time);
													row_time.push(time.week_time);
													row_time.push(time.classroom);
													row_time.push(item.id_class);
													return (
														<Row
															data={row_time}
															style={{
																height: 40,
															}}
														/>
													);
												})}
											</Table>
										</View>
									</View>
								);
							})}
						</ScrollView>
					</ScrollView>
				</View>
			</Modal>
		</ScrollView>
	);
};
const styles = StyleSheet.create({
	container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
	header: { backgroundColor: "#537791" },
	textHeader: { textAlign: "center", fontWeight: "700", color: "white" },
	textRecoder: { textAlign: "center", fontWeight: "300", color: "black" },
	dataWrapper: { marginTop: -1 },
	row: { height: 40, backgroundColor: "#fff" },
});
export default ManageClassesScreenGVien;
