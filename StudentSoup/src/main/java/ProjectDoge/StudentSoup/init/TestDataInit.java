package ProjectDoge.StudentSoup.init;

import ProjectDoge.StudentSoup.dto.board.BoardFormDto;
import ProjectDoge.StudentSoup.dto.boardreply.BoardReplyReqDto;
import ProjectDoge.StudentSoup.dto.department.DepartmentFormDto;
import ProjectDoge.StudentSoup.dto.member.MemberFormBDto;
import ProjectDoge.StudentSoup.dto.restaurant.RestaurantFormDto;
import ProjectDoge.StudentSoup.dto.restaurantmenu.RestaurantMenuFormDto;
import ProjectDoge.StudentSoup.dto.restaurantreview.RestaurantReviewRequestDto;
import ProjectDoge.StudentSoup.dto.school.SchoolFormDto;
import ProjectDoge.StudentSoup.entity.board.Board;
import ProjectDoge.StudentSoup.entity.board.BoardCategory;
import ProjectDoge.StudentSoup.entity.board.BoardLike;
import ProjectDoge.StudentSoup.entity.board.BoardReply;
import ProjectDoge.StudentSoup.entity.member.GenderType;
import ProjectDoge.StudentSoup.entity.member.Member;
import ProjectDoge.StudentSoup.entity.restaurant.Restaurant;
import ProjectDoge.StudentSoup.entity.restaurant.RestaurantCategory;
import ProjectDoge.StudentSoup.entity.restaurant.RestaurantMenuCategory;
import ProjectDoge.StudentSoup.entity.school.Department;
import ProjectDoge.StudentSoup.repository.board.BoardLikeRepository;
import ProjectDoge.StudentSoup.repository.board.BoardRepository;
import ProjectDoge.StudentSoup.repository.boardreply.BoardReplyRepository;
import ProjectDoge.StudentSoup.repository.department.DepartmentRepository;
import ProjectDoge.StudentSoup.repository.member.MemberRepository;
import ProjectDoge.StudentSoup.service.boardreply.BoardReplyFindService;
import ProjectDoge.StudentSoup.service.boardreply.BoardReplyRegisterService;
import ProjectDoge.StudentSoup.service.board.BoardResisterService;
import ProjectDoge.StudentSoup.service.board.BoardUpdateService;
import ProjectDoge.StudentSoup.service.department.DepartmentRegisterService;
import ProjectDoge.StudentSoup.service.member.MemberRegisterService;
import ProjectDoge.StudentSoup.service.member.MemberUpdateService;
import ProjectDoge.StudentSoup.service.restaurant.RestaurantFindService;
import ProjectDoge.StudentSoup.service.restaurant.RestaurantRegisterService;
import ProjectDoge.StudentSoup.service.restaurantmenu.RestaurantMenuRegisterService;
import ProjectDoge.StudentSoup.service.restaurantreview.RestaurantReviewRegisterService;
import ProjectDoge.StudentSoup.service.school.SchoolFindService;
import ProjectDoge.StudentSoup.service.school.SchoolRegisterService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.Profile;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.time.LocalTime;
import java.util.Collections;
import java.util.List;

@Component
@Slf4j
@Profile("local")
@RequiredArgsConstructor
public class TestDataInit {
    private final MemberRegisterService memberRegisterService;
    private final MemberUpdateService memberUpdateService;
    private final SchoolRegisterService schoolRegisterService;
    private final SchoolFindService schoolFindService;
    private final DepartmentRepository departmentRepository;
    private final DepartmentRegisterService departmentRegisterService;
    private final RestaurantRegisterService restaurantRegisterService;
    private final RestaurantFindService restaurantFindService;
    private final RestaurantMenuRegisterService restaurantMenuRegisterService;
    private final RestaurantReviewRegisterService restaurantReviewRegisterService;
    private final BoardResisterService boardResisterService;
    private  final MemberRepository memberRepository;
    private  final BoardRepository boardRepository;
    private final BoardLikeRepository boardLikeRepository;
    private final BoardReplyRepository boardReplyRepository;
    private final BoardReplyRegisterService boardReplyRegisterService;
    private final BoardReplyFindService boardReplyFindService;
    private final BoardUpdateService boardUpdateService;
    @EventListener(ApplicationReadyEvent.class)
    public void init(){
        initSchoolAndDepartment();
        initMember();
        initRestaurant();
        initRestaurantMenu();
        initRestaurantReview();
        initBoard();
        initBoardLike();
        initBoardReview();
    }

    private void initSchoolAndDepartment(){
        initSchool();
        initDepartment();
    }

    private void initSchool(){
        SchoolFormDto school1 = new SchoolFormDto();
        school1.setSchoolName("??????????????? ???????????????");
        school1.setSchoolCoordinate("37.3768067201,126.6347662307");

        SchoolFormDto school2 = new SchoolFormDto();
        school2.setSchoolName("??????????????? ???????????????");
        school2.setSchoolCoordinate("37.3768067201,126.6347662307");
        schoolRegisterService.join(school1);
        schoolRegisterService.join(school2);
    }

    private void initDepartment(){
        Long schoolId1 = schoolFindService.findOne("??????????????? ???????????????").getId();
        Long schoolId2 = schoolFindService.findOne("??????????????? ???????????????").getId();
        DepartmentFormDto dto1 = new DepartmentFormDto();
        dto1.setDepartmentName("???????????????1 ??????1");
        dto1.setSchoolId(schoolId1);

        DepartmentFormDto dto2 = new DepartmentFormDto();
        dto2.setDepartmentName("???????????????1 ??????2");
        dto2.setSchoolId(schoolId1);

        DepartmentFormDto dto3 = new DepartmentFormDto();
        dto3.setDepartmentName("???????????????2 ??????1");
        dto3.setSchoolId(schoolId2);

        DepartmentFormDto dto4 = new DepartmentFormDto();
        dto4.setDepartmentName("???????????????2 ??????2");
        dto4.setSchoolId(schoolId2);

        departmentRegisterService.join(schoolId1, dto1);
        departmentRegisterService.join(schoolId1, dto2);
        departmentRegisterService.join(schoolId2, dto3);
        departmentRegisterService.join(schoolId2, dto4);
    }

    private void initMember(){
        Long schoolId1 = schoolFindService.findOne("??????????????? ???????????????").getId();
        Long schoolId2 = schoolFindService.findOne("??????????????? ???????????????").getId();

        List<Department> departments1 = departmentRepository.findBySchool_Id(schoolId1);
        List<Department> departments2 = departmentRepository.findBySchool_Id(schoolId2);

        MemberFormBDto dto1 = createMemberFormDto("dummyTest1", "test123!", "???????????????1", "dummytest1@naver.com",
                GenderType.MAN, schoolId1, departments1.get(0).getId());
        MemberFormBDto dto2 = createMemberFormDto("dummyTest2", "test123!", "???????????????2", "dummytest2@naver.com",
                GenderType.MAN, schoolId1, departments1.get(0).getId());
        MemberFormBDto dto3 = createMemberFormDto("dummyTest3", "test123!", "???????????????3", "dummytest3@naver.com",
                GenderType.MAN, schoolId1, departments1.get(1).getId());
        MemberFormBDto dto4 = createMemberFormDto("dummyTest4", "test123!", "???????????????4", "dummytest4@naver.com",
                GenderType.WOMAN, schoolId2, departments2.get(0).getId());
        MemberFormBDto dto5 = createMemberFormDto("dummyTest5", "test123!", "???????????????5", "dummytest5@naver.com",
                GenderType.WOMAN, schoolId2, departments2.get(1).getId());
        MemberFormBDto dto6 = createMemberFormDto("dummyTest6", "test123!", "???????????????6", "dummytest6@naver.com",
                GenderType.WOMAN, schoolId2, departments2.get(1).getId());
        MemberFormBDto dto7 = createMemberFormDto("admin", "admin123!", "?????????", "admin@naver.com",
                GenderType.MAN, schoolId2, departments2.get(1).getId());

        memberRegisterService.join(dto1);
        memberRegisterService.join(dto2);
        memberRegisterService.join(dto3);
        memberRegisterService.join(dto4);
        memberRegisterService.join(dto5);
        memberRegisterService.join(dto6);
        memberRegisterService.join(dto7);

        memberRepository.findById("admin").ifPresent(memberUpdateService::updateMemberClassification);
    }

    private void initRestaurant(){
        Long schoolId1 = schoolFindService.findOne("??????????????? ???????????????").getId();
        Long schoolId2 = schoolFindService.findOne("??????????????? ???????????????").getId();

        RestaurantFormDto dto = new RestaurantFormDto().createRestaurantFormDto("??????????????? ?????????",
                "??????",
                RestaurantCategory.ASIAN,
                LocalTime.now(),
                LocalTime.now(),
                schoolId1,
                "37.3738948150,126.6364371486",
                null,
                "032-710-6464",
                "??????",
                "?????????",
                "Y");

        for(int i = 0; i < 30; i++){
            RestaurantFormDto testDto = new RestaurantFormDto().createRestaurantFormDto("??????????????? ?????????" + i,
                    "??????",
                    RestaurantCategory.ASIAN,
                    LocalTime.now(),
                    LocalTime.now(),
                    schoolId1,
                    "37.3738948150,126.6364371486",
                    null,
                    "032-710-6464",
                    "??????",
                    "?????????",
                    "Y");
            restaurantRegisterService.join(testDto);
        }

        RestaurantFormDto dto2 = new RestaurantFormDto().createRestaurantFormDto("????????? ?????????",
                "??????",
                RestaurantCategory.KOREAN,
                LocalTime.now(),
                LocalTime.now(),
                schoolId2,
                "37.3874120913,126.6637521009",
                null,
                "032-816-9888",
                "??????",
                "?????????",
                "Y");

        for(int i = 0; i < 30; i++){
            RestaurantFormDto testDto = new RestaurantFormDto().createRestaurantFormDto("????????? ?????????" + i,
                    "??????",
                    RestaurantCategory.ASIAN,
                    LocalTime.now(),
                    LocalTime.now(),
                    schoolId2,
                    "37.3738948150,126.6364371486",
                    null,
                    "032-816-9888",
                    "??????",
                    "?????????",
                    "Y");
            restaurantRegisterService.join(testDto);
        }
        restaurantRegisterService.join(dto);
        restaurantRegisterService.join(dto2);
    }

    private void initRestaurantMenu(){

        Restaurant restaurant1 = restaurantFindService.findByRestaurantNameAndSchoolName("????????? ?????????", "??????????????? ???????????????");
        Restaurant restaurant2 = restaurantFindService.findByRestaurantNameAndSchoolName("??????????????? ?????????", "??????????????? ???????????????");

        RestaurantMenuFormDto dto = new RestaurantMenuFormDto().createRestaurantMenuDto(restaurant1.getId(),
                "????????????",
                RestaurantMenuCategory.Main,
                9000);

        RestaurantMenuFormDto dto2 = new RestaurantMenuFormDto().createRestaurantMenuDto(restaurant1.getId(),
                "????????????",
                RestaurantMenuCategory.Main,
                8000);

        restaurantMenuRegisterService.join(dto);
        restaurantMenuRegisterService.join(dto2);

        for(int i = 0; i < 20; i++){
            RestaurantMenuFormDto testDto = new RestaurantMenuFormDto().createRestaurantMenuDto(restaurant1.getId(),
                    "????????????" + i,
                    RestaurantMenuCategory.Main,
                    9000);
            restaurantMenuRegisterService.join(testDto);
        }

        for(int i = 0; i < 10; i++){
            RestaurantMenuFormDto testDto = new RestaurantMenuFormDto().createRestaurantMenuDto(restaurant1.getId(),
                    "??? ??????" + i,
                    RestaurantMenuCategory.Side,
                    7000);
            restaurantMenuRegisterService.join(testDto);
        }

        for(int i = 0; i < 10; i++){
            RestaurantMenuFormDto testDto = new RestaurantMenuFormDto().createRestaurantMenuDto(restaurant1.getId(),
                    "?????? ????????? ??? ??? ?????? ????????? ????????? ???????????????." + i,
                    RestaurantMenuCategory.Side,
                    100000000);
            restaurantMenuRegisterService.join(testDto);
        }

        for(int i = 0; i < 10; i++){
            RestaurantMenuFormDto testDto = new RestaurantMenuFormDto().createRestaurantMenuDto(restaurant1.getId(),
                    "??????" + i,
                    RestaurantMenuCategory.Drink,
                    4000);
            restaurantMenuRegisterService.join(testDto);
        }

        for(int i = 0; i < 10; i++){
            RestaurantMenuFormDto testDto = new RestaurantMenuFormDto().createRestaurantMenuDto(restaurant1.getId(),
                    "?????? ????????? ????????? ????????? ??????????" + i,
                    RestaurantMenuCategory.Drink,
                    5000);
            restaurantMenuRegisterService.join(testDto);
        }

        for(int i = 0; i < 4; i++){
            RestaurantMenuFormDto testDto = new RestaurantMenuFormDto().createRestaurantMenuDto(
                    restaurant2.getId(),
                    "??????????????? 6p" + i + "case",
                    RestaurantMenuCategory.Main,
                    9900);
            restaurantMenuRegisterService.join(testDto);
        }

    }

    private void initBoard(){
        Member member = memberRepository.findById("dummyTest1").get();
        Member member1 = memberRepository.findById("dummyTest2").get();

        for(int i = 0; i < 10; i++){
            BoardFormDto boardFormDto = new BoardFormDto().createBoardFormDto("????????? ??????" + i, BoardCategory.FREE, "????????? ??????" + i);
            boardResisterService.join(member.getMemberId(), boardFormDto);
        }

        for(int i = 10; i < 20; i++){
            BoardFormDto boardFormDto = new BoardFormDto().createBoardFormDto("????????? ??????" + i, BoardCategory.FREE, "????????? ??????" + i);
            boardResisterService.testJoin(member.getMemberId(), boardFormDto);
        }

        for(int i = 20; i < 30; i++){
            BoardFormDto boardFormDto = new BoardFormDto().createBoardFormDto("????????? ??????" + i, BoardCategory.TIP, "????????? ??????" + i);
            boardResisterService.testJoin(member.getMemberId(), boardFormDto);
        }

        for(int i = 60; i < 90; i++){
            BoardFormDto boardFormDto = new BoardFormDto().createBoardFormDto("????????? ??????" + i, BoardCategory.EMPLOYMENT, "????????? ??????" + i);
            boardResisterService.join(member1.getMemberId(), boardFormDto);
        }

        for(int i = 100; i < 110; i++){
            BoardFormDto boardFormDto = new BoardFormDto().createTestAllBoardFormDto("????????? ??????" + i, BoardCategory.ANNOUNCEMENT, "????????? ??????" + i);
            boardResisterService.boardAllJoin(member1.getMemberId(), boardFormDto);
        }

        boardRepository.findById(252L).ifPresent(boardUpdateService::updateBoardView);
        boardRepository.findById(254L).ifPresent(boardUpdateService::updateBoardView);
        boardRepository.findById(213L).ifPresent(boardUpdateService::updateBoardAuthentication);
        boardRepository.findById(217L).ifPresent(boardUpdateService::updateBoardAuthentication);

        for(int i = 200; i < 220; i++){
            BoardFormDto boardFormDto = new BoardFormDto().createTestAllBoardFormDto("????????? ??????" + i, BoardCategory.EMPLOYMENT, "????????? ??????" + i);
            boardResisterService.boardAllJoin(member1.getMemberId(), boardFormDto);
        }

    }

    private void initBoardLike(){
        Member member = memberRepository.findById("dummyTest1").get();
        Member member1 = memberRepository.findById("dummyTest2").get();

        Board board = boardRepository.findByTitle("????????? ??????");
        Board board1 = boardRepository.findByTitle("????????? ??????2");

        BoardLike boardLike = new BoardLike().createBoard(member,board1);
        BoardLike boardLike1 = new BoardLike().createBoard(member1,board1);
        boardLikeRepository.save(boardLike);
    }

    private void initBoardReview(){
        Board board = boardRepository.findByTitle("????????? ??????0");
        Member member = memberRepository.findById("dummyTest1").get();

        for(int i = 1; i <= 5; i++){
            BoardReplyReqDto boardReplyReqDto = new BoardReplyReqDto(board.getId(), member.getMemberId(), "??????????????? " + i, null, null, 0);
            boardReplyRegisterService.join(boardReplyReqDto);
        }

        for(int i = 1; i <= 5; i++){
            for(int j = 1; j <= 4; j++){
                BoardReplyReqDto boardReplyReqDto = new BoardReplyReqDto(board.getId(), member.getMemberId(), "????????? ??? ?????? " + j, i, null, 1);
                boardReplyRegisterService.join(boardReplyReqDto);
            }
        }

        BoardReply reply1 = boardReplyFindService.findOne(282L);
        reply1.setLikedCount(10);

        BoardReply reply2 = boardReplyFindService.findOne(285L);
        reply2.setLikedCount(10);

        boardReplyRepository.save(reply1);
        boardReplyRepository.save(reply2);

    }

    private void initRestaurantReview(){
        Restaurant restaurant1 = restaurantFindService.findByRestaurantNameAndSchoolName("????????? ?????????", "??????????????? ???????????????");
        Restaurant restaurant2 = restaurantFindService.findByRestaurantNameAndSchoolName("??????????????? ?????????", "??????????????? ???????????????");
        Member member = memberRepository.findByEmail("dummytest1@naver.com");
        for(int i = 0; i < 30; i++){
            RestaurantReviewRequestDto dto = new RestaurantReviewRequestDto();
            dto.setRestaurantName(restaurant1.getName());
            dto.setMemberId(member.getMemberId());
            dto.setNickName(member.getNickname());
            dto.setContent((i + 1) + "??? ?????? ????????? ???????????????.");
            dto.setStarLiked((int)(Math.random() * 5) + 1);
            dto.setMultipartFileList(Collections.emptyList());
            restaurantReviewRegisterService.join(restaurant1.getId(), dto);
            restaurantReviewRegisterService.starUpdate(restaurant1.getId());
        }

        for(int i = 0; i < 20; i++){
            RestaurantReviewRequestDto dto = new RestaurantReviewRequestDto();
            dto.setRestaurantName(restaurant2.getName());
            dto.setMemberId(member.getMemberId());
            dto.setNickName(member.getNickname());
            dto.setContent((i + 1) + "??? ?????? ????????? ???????????????.");
            dto.setStarLiked((int)(Math.random() * 5) + 1);
            dto.setMultipartFileList(Collections.emptyList());
            restaurantReviewRegisterService.join(restaurant2.getId(), dto);
            restaurantReviewRegisterService.starUpdate(restaurant2.getId());
        }
    }

    private MemberFormBDto createMemberFormDto(String id, String pwd, String nickname, String email,
                                               GenderType gender, Long schoolId, Long departmentId){
        MemberFormBDto dto = new MemberFormBDto();
        dto.setId(id);
        dto.setPwd(pwd);
        dto.setNickname(nickname);
        dto.setEmail(email);
        dto.setGender(gender);
        dto.setSchoolId(schoolId);
        dto.setDepartmentId(departmentId);
        return dto;
    }
}
