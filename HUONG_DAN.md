# Thiệp Nhà trai — Đại & Hà

Bộ độc lập, giữ nguyên ảnh, nhạc và hiệu ứng lời chúc. Mở index.html là vào thẳng thiệp nhà trai.

## Tạo link riêng bằng GitHub Pages

1. Tạo repository riêng, ví dụ dai-ha-nha-trai.
2. Giải nén và tải **toàn bộ nội dung bên trong** lên thư mục gốc của repository. index.html phải nằm ở gốc, cùng guest-config.js và thư mục assets.
3. Vào Settings → Pages → Deploy from a branch → chọn nhánh main và thư mục / (root) → Save.
4. Dùng URL GitHub Pages được hiển thị trong Settings → Pages làm link gửi khách.

Mỗi bộ dùng một repository nên có một link riêng. Link thường có dạng https://TEN-TAI-KHOAN.github.io/dai-ha-nha-trai/, đây chỉ là ví dụ, chưa phải link đã tạo.

## Kết nối phản hồi và lời chúc

guest-config.js đã giữ URL Apps Script từ bộ gốc. Cả hai link dùng chung bảng quản lý; phản hồi vẫn được gắn đúng Nhà trai / Nhà gái. Lời chúc công khai vẫn được chia sẻ từ cả hai nhà như phiên bản trước.

Nếu chưa cập nhật backend cho hiệu ứng lời chúc: dán backend/Code.gs vào Apps Script, lưu, chọn Triển khai → Quản lý các lần triển khai → Chỉnh sửa → Phiên bản mới → Triển khai. Giữ URL /exec hiện tại. Chỉ cần làm một lần cho cả hai link.

Kiểm tra sau triển khai: mở link trên điện thoại, thử ảnh/nhạc, gửi xác nhận và lời chúc, rồi kiểm tra Google Sheets ghi đúng nhà. Tên và nội dung thuộc loại Lời chúc sẽ được công khai; thông tin xác nhận tham dự giữ riêng.

## Lời chúc nổi dưới màn hình (bản mới)

Sau khi tải được lời chúc thật, một thẻ sẽ nổi cố định ở góc dưới bên trái ngay khi mở thiệp. Tự chuyển mỗi 7 giây; dừng khi trỏ chuột hoặc đọc bằng bàn phím. Có nút trước/sau, tạm dừng, ẩn và mở lại. Sổ lưu bút vẫn có mục đọc tất cả. Không tạo lời chúc giả khi chưa có dữ liệu.

Nếu không thấy lời chúc: bắt buộc cập nhật toàn bộ backend/Code.gs vào Apps Script, lưu rồi vào Triển khai → Quản lý các lần triển khai → Chỉnh sửa (biểu tượng bút) → Phiên bản mới → Triển khai. Chỉ bấm Lưu mã là chưa đủ. Giữ URL /exec. Cả hai thiệp dùng cùng backend nên chỉ triển khai một lần. Quyền truy cập ứng dụng web là Bất kỳ ai và thực thi với tài khoản chủ bảng. Kiểm tra bảng Phản hồi có dòng loại Lời chúc với nội dung không trống; lời nhắn loại Xác nhận không đưa ra công khai.

Tải lại trang sau khi cập nhật GitHub Pages. Đợi tối đa 15 giây: nếu kết nối thất bại, sổ lưu bút sẽ báo lỗi và có nút Thử lại. Chưa thể xác định chính xác lỗi triển khai chỉ từ ảnh chụp.
