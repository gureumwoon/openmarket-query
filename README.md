# 🛒 Open Market (호두마켓)


오픈마켓 서비스는 판매자와 구매자를 구별하여 판매자가 상품을 등록, 판매하며 구매자는 구매하는 서비스입니다.
상품을 판매하려고 한다면 판매자로 로그인하여 상품 정보를 등록 및 수정할 수 있습니다. 판매자가 상품을 구매하는 것은 불가능합니다. 오픈마켓에 등록되어 있는 상품을 구매하고자 한다면 상품의 세부사항을 확인한 뒤, 장바구니에 넣어, 상품을 구매할 수 있습니다.

</br>

👉 [호두마켓 API](https://paullabworkspace.notion.site/API-7b57a2b656fd4e3790a6a360b69aa3ad#a9e0fdb06e37448f9d80c49777200dc4)

👉 [호두마켓 바로가기](https://hodumarket.shop/)
#### 구매자 계정
- 테스트 아이디: test1223
- 테스트 패스워드: test1223^^

#### 판매자 계정
- 테스트 아이디: test1226
- 테스트 패스워드: test1226^^

</br>

## ⚙️ 기술 스택

<br />

<div align=center>
<img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white">
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black">
<img src="https://img.shields.io/badge/React Query-FF4154?style=for-the-badge&logo=React Query&logoColor=white">
<img src="https://img.shields.io/badge/styled components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white">
<img src="https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=Typescript&logoColor=white">
<img src="https://img.shields.io/badge/React Router-CA4245?style=for-the-badge&logo=React Router&logoColor=white">
<img src="https://img.shields.io/badge/amazons3-569A31?style=for-the-badge&logo=amazons3&logoColor=white">
<img src="https://img.shields.io/badge/amazoncloudfront-FF4F8B?style=for-the-badge&logo=amazoncloudfront&logoColor=white">
<img src="https://img.shields.io/badge/amazonroute53-8C4FFF?style=for-the-badge&logo=amazonroute53&logoColor=white">
</div>

<br />

## 💡 주요기능

- 메인페이지(무한스크롤)
- 메인페이지(배너)
  
### 구매자
- 로그인 페이지
- 회원 가입 페이지
- 상품 목록 페이지
- 상품 상세 페이지
- 장바구니 페이지
- 주문/결제 페이지
- 검색 기능
  
### 판매자
- 로그인 페이지
- 회원 가입 페이지
- 상품 목록 페이지
- 상품 상세 페이지
- 판매자 센터 페이지
- 상품 등록 페이지
- 상품 삭제 & 수정

<br/>

## 회원가입

<div align="center">
  <table>
    <tr>
      <td align="center">
          <img
            src="https://user-images.githubusercontent.com/83581867/197980825-33c174b0-b77b-4a4e-941c-4d66064d9034.gif"
            width="500px;"
            alt=""
          /><br/><sub><b>구매자 회원가입</b></sub><br />
      </td>
       <td align="center">
          <img
            src="https://user-images.githubusercontent.com/83581867/198013665-a0685b69-4f35-4f68-8e54-3dc647a627d4.gif"
            width="500px;"
            alt=""
          /><br /><sub><b>판매자 회원가입</b></sub><br />
      </td>
    </tr>
  </table>
</div>

- 칸에 **정보를 입력하지 않고** 넘어가려고 하면 '**필수 정보입니다**'라는 문구가 칸 아래에 **붉은 글씨로 나타난다**.(칸의 테두리 컬러도 붉은색으로 바뀐다.)
- **아이디는 String이어야 하고** 다른 조건은 없다. 입력을 마치고 중복확인을 해서 검증을 받아서 **중복 아이디가 아닌 경우에 회원가입이 가능하다**. 
**중복아이디일 경우 ' 이미 사용 중인 아이디입니다**.'라는 경고문구가 나타나고 **중복아이디가 아닐 경우 '멋진 아이디네요 :)**'라는 문구가 나타난다.
**아이디 중복확인을 하지 않고 회원가입 버튼을 누르면 '아이디 중복확인을 해주세요**'라는 문구가 띄워진 alert창이 나타난다.
- 비밀번호는 8자 이상, 한개 이상의 영소문자가 필수적으로 들어가야 하고, 최소 한개의 숫자,최소 한개의 특수 문자한개 이상의 숫자가 필수적으로 들어가야 합니다. 조건에 맞는 비밀번호를 입력하면 칸 안에 있는 체크아이콘과 칸의 테두리가 초록색으로 변한다. 조건에 맞지 않으면,'8자 이상, 영문 대 소문자,숫자,특수문자를 사용하세요.'라는 경고 문구가 나타난다.
- 비밀번호 재확인 칸은 **위의 비밀번호와 일치하지 않으면, '비밀번호가 일치하지 않습니다**'라는 경고 문구가 나타나고 **일치하면, '비밀번호가 일치합니다**' 문구로 바뀌고 비밀번호 입력칸과 마찬가지로 **체크아이콘도 회색에서 초록색으로 바뀐다**.</span>
- 이름칸은 따로 조건은 없고 빈칸일 경우 '다른 칸들과 마찬가지로 필수 정보입니다. 경고 문구가 나타난다.
- 휴대전화의 첫번 째 칸은 화살표 아이콘을 클릭하면 드롭다운이 되고 거기서 휴대전화의 앞자리를 선택한다. 선택하고 나면 드롭다운박스가 올라가고 칸 안에 선택한 값이 들어와있다. 번호를 다 입력하고 **만약 가입한 적이 있는 핸드폰 번호면 '해당 사용자 전화번호는 이미 존재합니다**.'라는 경고문구가 뜨고 **사용 가능한 번호면 경고문구가 사라진다**.
- 이메일 칸은 **이메일 형식이 아닐경우 '잘못된 이메일 형식입니다**.'라는 경고 문구가 나타나고 **맞게 입력하면 '올바른 이메일 형식 입니다' 문구로 바뀐다**.
- **판매자 회원가입의 사업자등록번호는 10자리로 이루어진 숫자여야 한다. 조건에 맞게 입력하면, '올바른 형식 입니다**' 문구가 나타나고, **중복확인을 거쳐야 한다. 사용 가능한 사업자등록번호면 '사용 가능한 사업자등록번호입니다**.'문구가 뜨고 **중복된 사업자등록번호면 '이미 등록된 사업자등록번호입니다**.' 경고 문구가 뜬다. 만약 **사업자등록번호 중복확인을 하지 않고 회원가입 버튼을 누르면 '사업자등록번호를 인증해주세요**.' 문구의 alert창이 뜬다.
- **스토어 이름은 중복됐을 경우 '해당 스토어이름은 이미 존재합니다**.'라는 경고문구가 나타나고, **사용 가능한 스토어 이름이면 '사용 가능한 스토어 이름 입니다**.'라는 문구가 나타납니다.
  
- 모든 칸에 정보를 다 입력했어도 이용약관 동의 부분을 체크하지 않으면 회원가입 버튼이 활성화 되지 않는다. 또한 동의 부분을 체크 했더라도 위의 정보입력 칸이 하나라도 비어있으면 버튼이 비활성화 된다. 모든 정보가 입력되었고, 동의 부분도 체크가 완료되면 버튼이 활성화 된다.

<br />

## 로그인

<div align="center">
  <table>
    <tr>
       <td align="center">
          <img
            src="https://user-images.githubusercontent.com/83581867/198020802-2b5eba60-fad8-43d2-a40c-ec384fa30c83.gif"
            alt=""
          /><br /><sub><b>로그인</b></sub><br />
      </td>
    </tr>
  </table>
</div>

- 메인페이지의 Nav bar의 로그인 아이콘을 클릭해서 로그인 페이지로 이동한다.
- 구매회원가입으로 계정을 만들었으면 구매로그인, 판매회원가입으로 계정을 만들었으면 판매자로그인을 통해 로그인을 해야한다.
- 계정이 없다면 로그인 창의 밑에 회원가입을 클릭해서 회원가입 페이지로 이동해서 계정을 생성한다.
- 로그인에 성공하면 '환영합니다 ID님 :)' 문구의 alert창이 뜨고 확인을 누르면 메인 홈페이지로 이동한다.

<br />

## 메인페이지(무한스크롤)

<div align="center">
  <table>
    <tr>
       <td align="center">
          <img
            src="https://user-images.githubusercontent.com/83581867/202136811-3e424dc9-a293-41df-a666-6cab6c60779d.gif"
            alt=""
          /><br /><sub><b>메인페이지(무한스크롤)</b></sub><br />
      </td>
    </tr>
  </table>
</div>

- 처음 15개 상품 데이터를 보여주고 15개 상품의 끝까지 스크롤을 내리면 15개의 상품을 추가로 생성해서 보여준다.

<br />

## 메인페이지(배너)

<div align="center">
  <table>
    <tr>
       <td align="center">
          <img
            src="https://user-images.githubusercontent.com/83581867/202184332-d86d5f59-3090-4d48-83dd-579f7c6f83e1.gif"
            alt=""
          /><br /><sub><b>메인페이지(배너)</b></sub><br />
      </td>
    </tr>
  </table>
</div>

<br />

## 상품 상세 페이지 & 판매자 센터

<div align="center">
  <table>
    <tr>
      <td align="center">
          <img
            src="https://user-images.githubusercontent.com/83581867/198120167-7a7b2c84-af3a-49a4-bedc-62dcabc728da.gif"
            width="500px;"
            alt=""
          /><br/><sub><b>상세페이지(판매자 계정)</b></sub><br />
      </td>
       <td align="center">
          <img
            src="https://user-images.githubusercontent.com/83581867/198873229-e5be1820-0a94-4529-a887-90cd37558914.gif"
            width="500px;"
            alt=""
          /><br /><sub><b>상세페이지(구매자 계정)</b></sub><br />
      </td>
    </tr>
  </table>
</div>

- 상품의 금액과 이름 밑 부분 택배배송과 택배금액 관련된 문구에서 **택배비가 0원일 경우 '무료배송'이라 뜨고 그 외에는 택배비가 얼마인지 금액이 뜬다**.
- **수량버튼**을 통해서 몇개나 장바구니에 넣을지 or 주문할지 정할 수 있다. **남은 재고만큼 + 할 수 있고 그 이상으로 넘어가려고 하면 버튼이 작동하지 않는다**.
- 수량버튼을 통해서 수량을 정하고 나면 밑에 **총 상품 금액 부분의 총 수량 부분과 금액 부분도 그에 맞게 변경된다**.
- 바로구매 버튼을 클릭하면 바로 구매 가능하도록 구매페이지로 이동하게 되고, 장바구니 버튼을 클릭하면 장바구니 페이지로 이동하게 된다.
- **밑에 버튼 탭**은 내용은 따로 없지만 **클릭된 탭은 초록색으로 바뀐다** 그리고 **아무것도 클릭하지 않은 상태의 초기 상태는 첫번 째 탭이 초록색으로 기본 설정이 되어있다**.
- 판매자 계정으로 로그인 한 경우에는 바로구매와 장바구니 버튼이 비활성화 된다.

<br />

## 상품등록

<div align="center">
  <table>
    <tr>
       <td align="center">
          <img
            src="https://user-images.githubusercontent.com/83581867/198225388-a1610c99-4b05-41ba-95ae-0993e121aa68.gif"
            alt=""
          /><br /><sub><b>상품등록(판매자 계정)</b></sub><br />
      </td>
    </tr>
  </table>
</div>

- **상품등록은 판매자 계정으로 로그인 했을 경우에만 가능하다**.
- Nav bar에서 판매자 센터를 클릭하고 판매자센터 페이지에서 상품등록 버튼을 통해서 등록 페이지로 이동한다.
- 이미지 영역에서 **첨부 아이콘을 클릭**하고 등록할 상품의 이미지를 선택한다. 그럼 **상품의 이미지가 미리보기로 나타난다**.
- 나머지 정보들도 입력한다 (상품명,판매가,배송방법,배송비,재고) **배송방법은 택배,소포,등기와 직접배송(화물배송) 중에 선택이 가능하다**. 그리고 **판매가와 배송비는 입력하면 금액의 단위별로 , 표시가 생김**.
- 모두 입력하고 저장하기 버튼을 클릭하면 판매자 센터 페이지로 이동하고 본인이 등록한 상품 목록을 확인할 수 있다.

<br />

## 상품 삭제 & 수정

<div align="center">
  <table>
    <tr>
      <td align="center">
          <img
            src="https://user-images.githubusercontent.com/83581867/198221567-b2ad536b-dc93-4878-9073-b878d5a3805c.gif"
            width="500px;"
            alt=""
          /><br/><sub><b>상품삭제</b></sub><br />
      </td>
       <td align="center">
          <img
            src="https://user-images.githubusercontent.com/83581867/198241667-6b63c788-467e-417f-b4a7-640a5679fb51.gif"
            width="500px;"
            alt=""
          /><br /><sub><b>상품수정</b></sub><br />
      </td>
    </tr>
  </table>
</div>

- Nav bar의 판매자센터를 클릭해서 그 페이지로 이동하면 내가 등록한 상품들의 목록을 확인할 수 있고 삭제와 수정도 할 수 있다.
- 삭제 버튼에 포인터를 올려두면 border라인과 글씨 컬러가 회색에서 검정으로 변하고 클릭하면 목록에서 삭제가 된다. 그리고 사이드 Nav bar의 판매중인상품(n)의 n부분도 목록의 갯수에 맞게 변경된다.
- 수정 버튼을 클릭하면 수정페이지로 이동하게 된다. 수정할 부분을 수정하고 수정하기 버튼을 누르면 판매자 센터로 이동하게 되고 목록에서 바뀐 정보를 확인할 수 있다.

<br />

## 장바구니 기능

- ### 상세페이지

<div align="center">
  <table>
    <tr>
       <td align="center">
          <img
            src="https://user-images.githubusercontent.com/83581867/198882086-dd0a812f-245a-4b44-a4b3-d97dc722510b.gif"
            alt=""
          /><br /><sub><b>상세페이지(장바구니기능)</b></sub><br />
      </td>
    </tr>
  </table>
</div>

- 수량버튼을 통해서 수량을 결정하고 장바구니 버튼을 누르면 상품이 수량에 맞게 장바구니 목록에 들어가 있는걸 확인할 수 있다.
- 상품은 상품재고 수량 이하로만 주문이 가능하다. 만약 상품의 재고가 10개 남아있을 때, 10개의 수량으로 주문이 가능하지만 이미 장바구니에 몇개 담겨있는 상태로 10개의 수량을 장바구니에 넣으려고 하면 '현재 재고보다 더 많은 수량을 담을 수 없습니다.' 문장의 alert 경고창이 뜬다.
- 장바구니에 이미 있는 상품이면 '이미 장바구니에 있는 상품입니다.
장바구니로 이동하시겠습니까?'라고 물어보는 모달창이 뜨고 '예' 버튼을 클릭하면 상품이 장바구니에 담긴다.
- 장바구니의 수량과 내가 현재 장바구니에 넣으려는 수량의 합이 재고 이하의 갯수일 때, 장바구니 목록에 원하는 상품이 들어가 있는 걸 확인할 수 있다.
  
<br />

<div align="center">
  <table>
    <tr>
       <td align="center">
          <img
            src="https://user-images.githubusercontent.com/83581867/201475458-2fb61cb2-1957-4623-aede-2e6ce18a55e6.gif"
            alt=""
          /><br /><sub><b>상세페이지(계정없이)</b></sub><br />
      </td>
    </tr>
  </table>
</div>

- 로그인 하지 않은 상태에서 바로구매나 장바구니 버튼을 누르면 '로그인이 필요한 서비스입니다.
로그인 하시겠습니까?' 문구의 모달창이 뜨고 예 버튼을 클릭하면 로그인 페이지로 이동하게 된다.

<br />

- ### 장바구니페이지

<div align="center">
  <table>
    <tr>
       <td align="center">
          <img
            src="https://user-images.githubusercontent.com/83581867/200166107-eb093cc1-f26c-4ad4-bbbc-e1f3ef71bb53.gif"
            alt=""
          /><br /><sub><b>장바구니페이지</b></sub><br />
      </td>
    </tr>
  </table>
</div>

- 상위의 체크박스를 클릭하면 전체 선택이 가능하다.
- 상품마다 있는 체크박스를 클릭하면 개별 선택이 가능하다.
- 장바구니 페이지의 맨 밑 결제예정 금액은 선택된 상품의 가격과 배송비의 합이다.
- 개별삭제를 하려면 상품마다 있는 x 아이콘을 클릭하면 상품을 삭제하시겠습니까? 물어보는 모달창이 뜨고 확인을 누르면 삭제가 된다. 개별 선택을 하지 않아도 삭제가 가능하다.
- 다중 선택을 하고 맨위 x 아이콘을 누르면 다중 선택한 상품들이 삭제된다.
- 전체선택을 하고 맨위 x 아이콘을 누르면 전체 삭제가 된다.
- 각 상품마다 수량 수정이 가능하다. +나 - 버튼을 클릭하면 수량을 수정할 수 있는 모달창이 뜨고 원하는 수량만큼 +와-버튼을 눌러서 조정할 수 있다. 여기서도 상품의 재고수량 이하만큼 조정이 가능하다.

<br />

## 주문/결제하기 페이지

구매페이지로의 이동 방법 3가지
1. 상세페이지에서 바로구매
   
<div align="center">
  <table>
    <tr>
       <td align="center">
          <img
            src="https://user-images.githubusercontent.com/83581867/200167918-416712aa-a7d2-4963-8caa-91657dcb6f07.gif"
            alt=""
          />
      </td>
    </tr>
  </table>
</div>

- 상세페이지에서 수량 설정하고 바로구매 버튼을 누르면 주문/결제 페이지로 바로 넘어간다.
- 바로구매를 원했던 상품의 정보(상품이미지,상품명,수량,배송비,주문금액)가 뜬다.
- 배송정보를 입력하고 결제 수단을 정하고 최종결제 정보(상품금액,배송비,결제금액)를 확인한 후 정보제공 동의 부분을 체크하면 결제하기 버튼이 활성화가 된다. 클릭하면 상품 주문이 완성된다.

<br />

2. 장바구니 페이지에서 구매
   
<div align="center">
  <table>
    <tr>
       <td align="center">
          <img
            src="https://user-images.githubusercontent.com/83581867/200555013-a6e3eb9f-c64b-4cbd-b2ef-666cf26882fd.gif"
            alt=""
          />
      </td>
    </tr>
  </table>
</div>   

- 다중 선택을 통한 상품을 구매하고 싶으면, 장바구니에서 원하는 상품을 여러 개 선택하고 맨 밑의 주문하기 버튼을 클릭한다.
- 마찬가지로 구매를 원하는 상품들의 정보(상품이미지,상품명,수량,배송비,주문금액)가 뜬다.
- 배송정보를 입력하고 결제 수단을 정하고 최종결제 정보(상품금액,배송비,결제금액)를 확인한 후 정보제공 동의 부분을 체크하면 결제하기 버튼이 활성화가 된다. 클릭하면 상품 주문이 완성된다. 

<br />

3. 장바구니 페이지에서 개별구매

<div align="center">
  <table>
    <tr>
       <td align="center">
          <img
            src="https://user-images.githubusercontent.com/83581867/201094671-8e9af93a-5d09-4605-97ed-b6cac27ad929.gif"
            alt=""
          />
      </td>
    </tr>
  </table>
</div>

- 장바구니 페이지에서 원하는 상품 하나를 선택하고 그 상품의 금액 밑에 있는 주문하기 버튼을 클릭한다.
- 선택하지 않고 개별 주문하기 버튼을 클릭하면 '구매하실 상품을 선택해주세요.' 문구의 alert창이 뜬다.
- 선택을 하고 주문하기 버튼을 클릭하면 주문/결제 페이지로 이동하고 나머지는 위의 주문하기 방식과 같다.
  
<br />

## 검색 기능

<div align="center">
  <table>
    <tr>
       <td align="center">
          <img
            src="https://user-images.githubusercontent.com/83581867/230795906-c54add1c-d6b3-4c05-a668-0ad9f34e8824.gif"
            alt=""
          /><br /><sub><b>검색 기능</b></sub><br />
      </td>
    </tr>
  </table>
</div>

<br />

## 🔨 트러블 슈팅


<br />

<details>
<summary>
➡️ 카트에 넣은 상품이 장바구니 페이지에서 보이지 않음.
</summary>

  #### 원인

  - api 주소가 paging 처리 되어 있어서 제일 최근에 업로드된 상품 15개만 불러와져서 그 뒤의 상품들이 불러와지지 않아서 상품이 조회가 안 되는 문제가 발생했다.

 #### 해결방안
 - [해결방안](https://velog.io/@codns1223/React-paging%EC%B2%98%EB%A6%AC%EB%90%9C-api%EC%97%90%EC%84%9C-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EA%B0%80%EC%A0%B8%EC%98%A4%EA%B8%B0)
</details>


<details>
<summary>
 ➡️ 장바구니 상품 배열 순서 문제
</summary>


#### 원인


- 장바구니의 배열이 cart 데이터의 순서로 되어있지 않고, product 데이터 배열에서 cart데이터 상품들의 product_id와 같은 상품들을 추출해서 그 배열로 정렬하게 만들어서 제일 최근에 추가한 상품인데도 장바구니 배열의 마지막에 추가 되는게 아니라 뜬금없는 중간에 추가되는 일이 발생함. 그래서 삭제할 때도 선택한 상품이 아닌 다른 상품이 삭제되는 일이 발생함.

```javascript
const cart = useSelector((state) => state.cart.cartList)
const product = useSelector((state) => state.product.products)
const cartId = cart.map((c, i) => c.product_id)
const item = product.filter((i) => cartId.includes(i.product_id))

 {
      item && item.map((c, i) => {
          return <CartGrid
              key={i}
              {...c}
          />
      })
}            
```

#### 해결방안

```javascript
const cart = useSelector((state) => state.cart.cartList)
const product = useSelector((state) => state.product.products)
const cartId = cart.map((c, i) => c.product_id)
const item = product.filter((i) => cartId.includes(i.product_id))

 {
      cart && cart.map((c, i) => {
          return <CartGrid
              key={i}
              {...c}
              item={item.find((p, i) => c.product_id === p.product_id)}
          />
      })
}            
```
- 배열 순서를 cart데이터 순으로 바꾸기 위해서 cart 데이터로 map을 돌리게끔 바꿨지만 cart 데이터에는 상품의 데이터가 아니라
  상품의 아이디 ,카트 아이디, 카트번호, 수량 정보만 들어 있어서 product 데이터가 필요하다.
  그래서 find 함수를 이용해서 item 데이터에서 cart의 product_id와 item의 product_id가 같은 항목을 찾게끔 해줘서 item 배열을
  cart 데이터 배열의 순서와 맞췄고 cartGrid 컴포넌트에서는 item을 props로 받아서 상품의 데이터를 표시해 줬다.

</details>
