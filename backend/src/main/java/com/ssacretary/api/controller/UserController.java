package com.ssacretary.api.controller;
import com.ssacretary.api.request.user.EditUserReq;
import com.ssacretary.api.request.user.LoginReq;
import com.ssacretary.api.request.user.SignupReq;
import com.ssacretary.api.response.user.UserLoginPostRes;
import com.ssacretary.api.service.UserServiceImpl;
import com.ssacretary.common.response.BaseResponseBody;
import com.ssacretary.config.JwtTokenProvider;
import com.ssacretary.db.repository.UserRepository;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

@Api(value = "유저 API", tags = {"User"})
@RequestMapping("/api/user")
@RequiredArgsConstructor
@RestController
@CrossOrigin("*")
public class UserController {

    private final UserRepository userRepository;

    @Autowired
    UserServiceImpl userServiceImpl;
    @Autowired
    JwtTokenProvider jwtTokenProvider;

    // 회원가입
    @PostMapping("/")
    @ApiOperation(value = "회원 가입", notes = "<strong>이메일과 패스워드</strong>를 통해 회원가입 한다.")
    public ResponseEntity<? extends BaseResponseBody> signUp(@RequestBody SignupReq signupReq) {

        boolean resbody = userServiceImpl.createUser(signupReq);

        if(resbody){
            return ResponseEntity.ok().body(BaseResponseBody.of(200, "회원가입 성공"));
        }

        return ResponseEntity.status(400).body(BaseResponseBody.of(400, "회원가입 실패"));
   }

    // 로그인
    @PostMapping("/login")
    @ApiOperation(value = "로그인", notes = "<strong>아이디와 패스워드</strong>를 통해 로그인 한다.")
    public ResponseEntity<UserLoginPostRes> login(@RequestBody @ApiParam(value = "로그인 정보", required = true) LoginReq loginReq, HttpServletResponse response) {
        UserLoginPostRes resbody = userServiceImpl.login(loginReq);
        response.setHeader("Authorization",resbody.getJwt());
        if(resbody.getEmail()!=null)
            return ResponseEntity.ok(UserLoginPostRes.of(200, "로그인 성공",resbody.getJwt(), resbody.getEmail(), resbody.getPhoneNum(), resbody.getNickname()));
        else if(resbody.getNickname().equals("wrong email"))
            return ResponseEntity.status(400).body(UserLoginPostRes.of(400, "가입되지 않은 E-MAIL 입니다.","","","",""));
        else if(resbody.getNickname().equals("wrong password"))
            return ResponseEntity.status(400).body(UserLoginPostRes.of(400, "잘못된 비밀번호입니다.","","","",""));
        return ResponseEntity.status(400).body(UserLoginPostRes.of(400, "로그인 실패","","","",""));
    }




    // 회원정보 수정
    @PutMapping("/")
    @ApiOperation(value = "회원정보 수정")
    public ResponseEntity<UserLoginPostRes> editUser(@RequestHeader(value = "Authorization") String JWT, @RequestBody EditUserReq editUserReq){
        UserLoginPostRes resbody = userServiceImpl.editUser(JWT,editUserReq);
        if(resbody.getEmail()==null)
            return ResponseEntity.ok(UserLoginPostRes.of(402, "잘못된 토큰입니다.",null,null,null,null));
        else if(resbody.getEmail().equals("wrong jwt"))
            return ResponseEntity.status(401).body(UserLoginPostRes.of(401,"잘못된 JWT 서명입니다.",null,null,null,null));
        else if(resbody.getEmail()!=null){
            return ResponseEntity.ok(UserLoginPostRes.of(200, "수정 성공",resbody.getJwt(),resbody.getEmail(),resbody.getPhoneNum(),resbody.getNickname()));
        }
        return ResponseEntity.status(400).body(UserLoginPostRes.of(400, "수정 실패",resbody.getJwt(),"","",""));
    }

    @DeleteMapping("/")
    @ApiOperation(value = "회원 탈퇴")
    public ResponseEntity<BaseResponseBody> deleteUser(@RequestHeader(value = "Authorization") String JWT){

        //jwt로 본인확인후
        String email = jwtTokenProvider.getUserInfo(JWT);
        if(email==null) return ResponseEntity.ok(BaseResponseBody.of(402, "잘못된 토큰입니다."));
        else if (email.equals("wrong jwt")) return ResponseEntity.status(401).body(BaseResponseBody.of(401,"잘못된 JWT 서명입니다."));

        boolean resbody = userServiceImpl.deleteUser(email);

        if(resbody){
            return ResponseEntity.ok().body(BaseResponseBody.of(200, "회원탈퇴 성공"));
        }
        return ResponseEntity.status(400).body(BaseResponseBody.of(400, "회원탈퇴 실패"));
    }

//    //로그아웃
//    @ApiImplicitParams({@ApiImplicitParam(name = "SSACRETARY-TOKEN", value = "JWT token", required = true, dataType = "string", paramType = "header")})
//    @ApiOperation(value = "로그아웃")
//    @GetMapping("/signout")
//    public BaseResponseBody signOut(@RequestHeader(value = "SSACRETARY-TOKEN") String JWT) {
//        return userServiceImpl.signOut(JWT);
//    }


    // 회원 이메일 중복 확인
    @GetMapping("/userEmailCheck/{email}")
    @ApiOperation(value = "회원 이메일 중복 확인", notes = "DB에 있으면 400, 없으면 200")
    public ResponseEntity<? extends BaseResponseBody> userEmailCheck(@PathVariable("email") String email) {
        if (userRepository.findByEmail(email).isPresent()) {
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "이메일이 중복입니다"));
        } else {
            return ResponseEntity.ok().body(BaseResponseBody.of(200, "이메일 사용가능"));
        }
    }

    // 회원 닉네임 중복 확인
    @GetMapping("/userNickNameCheck/{nickname}")
    @ApiOperation(value = "회원 닉네임 중복 확인", notes = "DB에 있으면 400, 없으면 200")
    public ResponseEntity<? extends BaseResponseBody> userNickNameCheck(@PathVariable("nickname") String nickname) {
        if (userRepository.findByNickname(nickname).isPresent()) {
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "닉네임이 중복입니다"));
        } else {
            return ResponseEntity.ok().body(BaseResponseBody.of(200, "닉네임 사용가능"));
        }
    }

    // 회원 닉네임 중복 확인
    @GetMapping("/userPhoneNumberCheck/{phone}")
    @ApiOperation(value = "회원 핸드폰 번호 중복 확인", notes = "DB에 있으면 400, 없으면 200")
    public ResponseEntity<? extends BaseResponseBody> userPhoneNumberCheck(@PathVariable("phone") String phone) {
        if (userRepository.findByPhone(phone).isPresent()) {
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "닉네임이 중복입니다"));
        } else {
            return ResponseEntity.ok().body(BaseResponseBody.of(200, "닉네임 사용가능"));
        }
    }

}
