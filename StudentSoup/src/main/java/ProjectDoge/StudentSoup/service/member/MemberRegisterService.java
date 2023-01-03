package ProjectDoge.StudentSoup.service.member;

import ProjectDoge.StudentSoup.dto.member.MemberFormBDto;
import ProjectDoge.StudentSoup.entity.member.Member;
import ProjectDoge.StudentSoup.entity.school.Department;
import ProjectDoge.StudentSoup.entity.school.School;
import ProjectDoge.StudentSoup.repository.department.DepartmentRepository;
import ProjectDoge.StudentSoup.repository.member.MemberRepository;
import ProjectDoge.StudentSoup.repository.school.SchoolRepository;
import ProjectDoge.StudentSoup.service.department.DepartmentFindService;
import ProjectDoge.StudentSoup.service.school.SchoolFindService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberRegisterService {

    private final MemberRepository memberRepository;
    private final MemberValidationService memberValidationService;
    private final SchoolRepository schoolRepository;
    private final SchoolFindService schoolFindService;
    private final DepartmentRepository departmentRepository;
    private final DepartmentFindService departmentFindService;

    @Transactional
    public Long join(MemberFormBDto dto) {
        log.info("회원 생성 메서드가 실행되었습니다.");

        School school = schoolFindService.findOne(dto.getSchoolId());
        Department department = departmentFindService.findOne(dto.getDepartmentId());

        log.info("회원의 학교는 : {}, 회원의 학과는 : {}", school.getSchoolName(), department.getDepartmentName());

        validateDuplicateMember(dto);

        Member member = new Member().createMember(dto, school, department);
        memberRepository.save(member);

        log.info("회원이 생성되었습니다. [{}][{}] ", member.getId(), member.getNickname());

        return member.getMemberId();
    }

    private void validateDuplicateMember(MemberFormBDto dto) {
        memberValidationService.validateDuplicateMemberNickname(dto.getNickname());
        memberValidationService.validateDuplicateMemberEmail(dto.getEmail());
    }


}
