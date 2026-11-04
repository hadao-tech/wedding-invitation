# Bản 3 — Lời chúc nổi dưới màn hình

1. Giải nén toàn bộ ZIP. Có thể mở index.html trực tiếp bằng Chrome/Edge khi có Internet.
2. Trong Google Sheets chọn Extensions → Apps Script. Thay toàn bộ Code.gs bằng backend/Code.gs trong bộ này, lưu.
3. Deploy → Manage deployments → chọn bản đang dùng → biểu tượng bút chì → Version: New version → Deploy. Giữ nguyên URL /exec. Thực thi bằng tài khoản chủ bảng và quyền truy cập Anyone (Bất kỳ ai). Chỉ làm một lần cho cả hai thiệp.
4. Mở URL /exec đang điền trong guest-config.js bằng trình duyệt. Bản đúng sẽ trả về version:3 và features:["public-wishes"]. Nếu vẫn version:1 là chưa triển khai đúng phiên bản.
5. Mở index.html; lời chúc thật sẽ tải và nổi ở góc dưới trái, chuyển mỗi 7 giây. Có trước/sau, tạm dừng, ẩn/mở lại. Nếu chưa tải được, xem thông báo và nút Thử lại ở sổ lưu bút; tối đa khoảng 28 giây cho hai cách kết nối.

Dữ liệu lấy từ dòng loại Lời chúc trong sheet Phản hồi của bảng hiện tại, chung cả hai nhà. Không công khai lời nhắn thuộc Xác nhận. Không thay lời chúc thật bằng dữ liệu mẫu. Nếu đổi URL triển khai, sửa endpoint trong guest-config.js của cả hai bộ.

Khi đưa lên GitHub Pages, tải toàn bộ nội dung bộ tương ứng lên gốc repository. Không cần xóa dữ liệu trong Google Sheets.
