class ToggleService {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new HeaderService();
        }
        return this.#instance;
    }

    loadHeader() {
        const container = document.querySelector(".menu-aside");
        const principal = PrincipalApi.getInstance().getPrincipal();

        ToggleService.innerHTML = `
        <aside class="menu-aside">
        <div class="mypage-login">
            <div class="profile-box">
                <a href="" class="link-profile">
                    <div class="profile-img">
                        <img class="user-profile" src="https://t1.kakaocdn.net/estoreweb/images/20220905161229/profile_default.png" alt="사용자">
                    </div>
                    <span class="login">로그인></span>
                </a>
            </div>
            <div class="mypage-info">
                <ul class="mypage-box">
                    <li class="mypage-home">
                        <a href="" class="mypage-link">
                            <i class="fa-regular fa-face-smile"></i>
                            <p class="mypage-chart">구매내역</p>
                        </a>
                    </li>
                    <li class="mypage-new">
                        <a href="" class="mypage-link">
                            <i class="fa-solid fa-gift"></i>
                            <p class="mypage-chart">선물함</p>
                        </a>
                    </li>
                    <li mypage="mypage-popularity">
                        <a href="" class="mypage-link">
                            <i class="fa-solid fa-ticket-simple"></i>
                            <p class="mypage-chart">쿠폰함</p>
                        </a>
                    </li>
                    <li class="mypage-style">
                        <a href="" class="mypage-link">
                            <i class="fa-regular fa-heart"></i>
                            <p class="mypage-chart">좋아요</p>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div>
            <ul class="abc">
                <li class="abc-li">
                    <a href="" class="mypage-buttons">홈</a>
                </li>
                <li class="abc-li">
                    <a href="" class="mypage-buttons">신규</a>
                </li>
                <li class="abc-li">
                    <a href="" class="mypage-button">인기</a>
                </li>
                <li class="abc-li">
                    <a href="" class="mypage-button">스타일</a>
                </li>
            </ul>
        </div>
        <div>
            <ul class="abcd">
                <li class="nqp-inform">
                    <a href="" class="nqp-link">새소식</a>
                </li>
                <li class="abcd-a">
                    <a href="" class="nqp-link">자주묻는 질문</a>
                </li>
                <li class="abcd-a">
                    <a href="" class="nqp-link">이모티콘 일련번호 입력하기</a>
                </li>
            </ul>
        </div>
        <div class="company-footer">
            <div>
                <a href="" class="company-link">
                    <span class="company-kakao">kakao</span><span class="company-emoticon">emoticon</span><span class="company-shop">shop</span>
                </a>
            </div>
            <div>
                <a href="https://www.kakaocorp.com" class="company-link2">@ kakao Corp</a>
            </div>
        </div>
    </aside>
            </ul>
        `;
    }

}