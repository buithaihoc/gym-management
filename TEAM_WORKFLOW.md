# 👥 TEAM WORKFLOW - QUY TRÌNH LÀMVIỆC NHÓM

## 📋 Mục Tiêu

Tài liệu này giúp 4 thành viên nhóm làm việc hiệu quả:
- Chia công việc rõ ràng
- Tránh conflict
- Review code chất lượng
- Deploy hệ thống hoàn chỉnh

---

## 👥 PHÂN CÔNG & TRÁCH NHIỆM

### Nhóm Trưởng (Bạn)
- **Vai trò:** Quản lý dự án, review code, merge PR
- **Công việc:**
  - Setup server & infrastructure
  - Quản lý git repository
  - Review & merge PR từ team
  - Tổng hợp tính năng, deployment
  - Debug & troubleshoot

### Thành Viên A - Backend (Members Feature)
- **Công việc:** Xây dựng API cho quản lý thành viên
  - CRUD endpoints: GET, POST, PUT, DELETE
  - Search, filter, pagination
  - Validation
  - Database queries

### Thành Viên B - Backend (Memberships Feature)
- **Công việc:** Xây dựng API cho quản lý gói tập
  - CRUD endpoints
  - Relationship với Members
  - Price calculation
  - Expiry date handling

### Thành Viên C - Backend (Payments Feature)
- **Công việc:** Xây dựng API cho quản lý thanh toán
  - CRUD endpoints
  - Payment status tracking
  - Multiple payment methods
  - Payment history

### Nhóm Trưởng (cùng) - Frontend
- **Công việc:** 
  - React setup & routing
  - UI components (Header, Sidebar, Table, Form)
  - API integration
  - Dashboard

---

## 📅 TIMELINE

### Phase 1: Setup & Planning (Tuần 1)
- [ ] Setup git repository
- [ ] Create database schema
- [ ] Setup backend (main.py, database.py)
- [ ] Setup frontend (React, routing)
- [ ] Create documentation
- **Deadline:** End of Week 1

### Phase 2: API Development (Tuần 2-3)
- [ ] Member endpoints (A)
- [ ] Membership endpoints (B)
- [ ] Payment endpoints (C)
- [ ] Test APIs in Swagger
- **Deadline:** End of Week 3

### Phase 3: Frontend Development (Tuần 3-4)
- [ ] Members page + components
- [ ] Memberships page + components
- [ ] Payments page + components
- [ ] Connect to API
- **Deadline:** End of Week 4

### Phase 4: Integration & Testing (Tuần 4-5)
- [ ] End-to-end testing
- [ ] Bug fixes
- [ ] UI improvements
- [ ] Documentation
- **Deadline:** End of Week 5

---

## 🔄 GIT WORKFLOW

### Initial Setup (Nhóm Trưởng)

```bash
# 1. Tạo repository trên GitHub
# (Online: github.com/new)

# 2. Clone về máy
git clone <repo-url>
cd gym-management

# 3. Tạo branch develop
git checkout -b develop
git push -u origin develop

# 4. Báo cho team: 
# "Ready! Clone và checkout branch develop"
```

### Mỗi Thành Viên - Bắt Đầu

```bash
# 1. Clone repository
git clone <repo-url>
cd gym-management

# 2. Checkout branch develop
git checkout develop

# 3. Tạo branch feature riêng
git checkout -b feature/members        # Thành viên A
git checkout -b feature/memberships    # Thành viên B
git checkout -b feature/payments       # Thành viên C

# 4. Code, code, code...
```

### Mỗi Thành Viên - Commit & Push

```bash
# 1. Check status
git status

# 2. Add changes
git add .

# 3. Commit (follow convention)
git commit -m "feat: add members CRUD endpoints"
# Hoặc:
git commit -m "feat: add members list with pagination
- GET /members endpoint with query params
- Added search by name/email
- Added is_active filter"

# 4. Push (push regularly!)
git push -u origin feature/members
```

### Commit Convention

```
Format: <type>: <short description>

Types:
  feat     - Tính năng mới
  fix      - Bug fix
  refactor - Cải thiện code (logic không đổi)
  style    - Formatting, style (không ảnh hưởng)
  docs     - Documentation
  test     - Thêm/sửa test
  chore    - Config, dependencies

Examples:
  ✅ feat: add member creation endpoint
  ✅ feat: add pagination to members list
  ✅ fix: handle email validation error
  ✅ refactor: simplify database query
  ✅ docs: update API reference
  ❌ update members (quá chung chung)
  ❌ fix stuff (không rõ gì)
```

### Pull Request Workflow

#### Bước 1: Thành Viên - Tạo PR (khi feature xong)

```bash
# Đảm bảo local code mới nhất
git fetch origin
git rebase origin/develop

# Push lên
git push -u origin feature/members

# Tạo PR trên GitHub:
# 1. Mở GitHub
# 2. Click "New pull request"
# 3. Compare: develop ← feature/members
# 4. Viết description:
```

**Template PR Description:**
```markdown
## What does this PR do?
Add CRUD endpoints for Members management

## Changes
- GET /members - List all members with pagination
- GET /members/{id} - Get member details
- POST /members - Create new member
- PUT /members/{id} - Update member
- DELETE /members/{id} - Delete member

## Testing
- Tested with Swagger UI
- All endpoints return correct status codes
- Email validation works

## Screenshots/Videos
(If applicable)

## Related Issues
Closes #1

## Checklist
- [x] Code follows style guidelines
- [x] Self-reviewed changes
- [x] Tested locally
- [x] Updated documentation
```

#### Bước 2: Nhóm Trưởng - Review PR

```
1. Mở PR trên GitHub
2. Click "Files changed"
3. Review code:
   - Logic có đúng không?
   - Error handling?
   - Code style?
   - Tests?
4. Comment nếu cần sửa
5. Approve hoặc "Request changes"
```

**Checklist Review:**
- [ ] Công nghệ/design phù hợp?
- [ ] Logic đúng?
- [ ] Error handling?
- [ ] Code quality (readable, DRY)?
- [ ] Tests?
- [ ] Documentation?
- [ ] Không có hardcode/secrets?

#### Bước 3: Thành Viên - Fix Review Comments

```bash
# 1. Fix code dựa vào comments
# (Edit files)

# 2. Commit & push (tự động update PR)
git add .
git commit -m "fix: address review comments"
git push origin feature/members

# 3. Comment trên PR:
# "Fixed! Ready for re-review"
```

#### Bước 4: Nhóm Trưởng - Merge

```bash
# Khi PR approved:
# 1. Click "Merge pull request" trên GitHub
# 2. Chọn "Squash and merge" (tọn gọn)
# 3. Confirm

# Hoặc từ terminal:
git checkout develop
git pull origin develop
git merge --no-ff feature/members  # Giữ lại merge commit
git push origin develop

# Xoá branch cũ
git branch -d feature/members
git push origin --delete feature/members
```

---

## 📝 DAILY STANDUP

**Mỗi ngày (15 phút):**

Mỗi người report:
1. **Hôm qua:** Làm gì xong?
2. **Hôm nay:** Kế hoạch?
3. **Blocker:** Gặp trở ngại gì?

**Ví dụ:**
```
Thành viên A (Members):
- Hôm qua: Xong GET/POST/PUT endpoint
- Hôm nay: Làm DELETE endpoint + tests
- Blocker: Không có

Thành viên B (Memberships):
- Hôm qua: Setup model
- Hôm nay: Viết GET/POST endpoints
- Blocker: Database relationship chưa hiểu, cần help

Thành viên C (Payments):
- Hôm qua: Setup router
- Hôm nay: Viết CRUD
- Blocker: Không có

Nhóm Trưởng:
- Hôm qua: Setup database + git
- Hôm nay: Review PRs + setup frontend
- Blocker: Không có
```

---

## 🐛 HANDLING CONFLICTS

### Git Conflict

Nếu 2 người sửa cùng file → conflict

**Thành viên:**
```bash
# 1. Pull latest develop
git fetch origin
git rebase origin/develop

# Git sẽ báo conflict
# Mở file, xoá conflict markers:
<<<<<<< HEAD
my changes
=======
their changes
>>>>>>> feature/memberships

# Giữ lại code đúng, xoá markers

# 2. Resolve & commit
git add .
git commit -m "resolve merge conflict"
git push origin feature/xxx
```

**Cách tránh conflict:**
- Không sửa file chung nếu có thể
- Merge frequently từ develop
- Communicate khi sửa file chung

### Code Conflict (Logic)

Nếu 2 feature interact với nhau → conflict logic

**Solution:**
```bash
# 1. Thảo luận design trước khi code
# 2. Test integration kỹ càng
# 3. Pair programming nếu phức tạp
```

---

## 🔍 CODE REVIEW STANDARDS

### Checklist Cho Reviewer

```python
# ❌ BAD - Lặp code
@router.get("/members")
def get_members(db: Session = Depends(get_db)):
    return db.query(Member).all()

@router.get("/memberships")
def get_memberships(db: Session = Depends(get_db)):
    return db.query(Membership).all()

# ✅ GOOD - Extract function
def get_all(model, db):
    return db.query(model).all()

# ❌ BAD - No error handling
@router.get("/members/{id}")
def get_member(id: int, db: Session = Depends(get_db)):
    return db.query(Member).filter(Member.id == id).first()
    # Nếu không tìm thấy → None (bad)

# ✅ GOOD - Error handling
@router.get("/members/{id}")
def get_member(id: int, db: Session = Depends(get_db)):
    member = db.query(Member).filter(Member.id == id).first()
    if not member:
        raise HTTPException(status_code=404, detail="Not found")
    return member

# ❌ BAD - Validation ở controller
@router.post("/members")
def create_member(member: dict, db: Session = Depends(get_db)):
    if not member.get('name'):
        raise HTTPException(status_code=400, detail="Name required")
    # ...

# ✅ GOOD - Validation ở schema
class MemberCreate(BaseModel):
    name: str = Field(..., min_length=1)  # Pydantic handles validation
    email: EmailStr  # Built-in email validation
```

### Questions to Ask

1. **Readability:** Có thể hiểu code này không?
2. **Error Handling:** Xử lý error đủ không?
3. **Security:** Có security issue không?
4. **Performance:** Có N+1 query không? Complexity?
5. **Tests:** Có test không?
6. **Documentation:** Có doc không?

---

## 🚀 DEPLOYMENT CHECKLIST

Khi feature complete:

```
Frontend:
- [ ] UI responsive (mobile, tablet, desktop)
- [ ] Forms validate correctly
- [ ] Error messages clear
- [ ] Loading states shown
- [ ] No console errors

Backend:
- [ ] All endpoints tested
- [ ] Database queries optimized
- [ ] Error handling complete
- [ ] Logging added
- [ ] Environment variables set

Integration:
- [ ] Frontend connects to backend
- [ ] Data flows correctly
- [ ] No CORS errors
- [ ] Performance acceptable

Documentation:
- [ ] API documented
- [ ] README updated
- [ ] Comments added for complex code
- [ ] No TODO left
```

---

## 📞 COMMUNICATION TIPS

### When to Reach Out

1. **Blocker:** Stuck on something
2. **Conflict:** 2 people working on same thing
3. **Question:** Clarify requirements
4. **Help:** Need pair programming
5. **Status:** Update progress daily

### Tools

- **Chat:** Teams/Discord/Slack - Quick messages
- **PR Comments:** Code discussions
- **Issues:** Detailed bugs/tasks
- **Video Call:** Complex discussions

### Weekly Sync

```
Monday 9 AM:
- Review last week's progress
- Plan this week's work
- Assign issues

Friday 4 PM:
- Demo features
- Discuss blockers
- Plan next week
```

---

## ✅ QUALITY GATES

Để merge vào develop:

```
✅ Code Review: Approved by team lead
✅ Tests: Locally tested (no runtime errors)
✅ Documentation: Updated
✅ No Conflicts: Clean merge
✅ PR Description: Clear & complete
✅ Commits: Follow convention
```

---

## 🎯 SUCCESS METRICS

Đánh giá dự án thành công:

- ✅ Tất cả API endpoints hoạt động
- ✅ Frontend connect được với backend
- ✅ CRUD operations đủ 4 features
- ✅ Code sạch & documented
- ✅ Team hiểu code của nhau
- ✅ Zero production bugs
- ✅ Deployment smooth

---

## 📚 RESOURCES

- **Git Cheatsheet:** https://github.github.com/training-kit/
- **GitHub Issues:** github.com/yourrepo/issues
- **Pull Request Guide:** github.com/features/projects
- **Code Review:** https://google.github.io/eng-practices/review/

---

**Remember: Communication > Perfection**

Nếu bạn không chắc, hãy hỏi! Better ask 10 times than lose 1 week.

