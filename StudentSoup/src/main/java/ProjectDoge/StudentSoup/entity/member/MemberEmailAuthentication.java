package ProjectDoge.StudentSoup.entity.member;

import ProjectDoge.StudentSoup.dto.member.MemberEmailAuthenticationDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.aspectj.weaver.Member;
import org.springframework.context.annotation.Primary;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "MEMBER_EMAIL_AUTHENTICATION")
public class MemberEmailAuthentication {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "EMAIL_AUTHENTICATION_ID")
    private Long Id;

    private String email;

    private LocalDateTime createDate;

    private Integer authenticationNumber;

    public MemberEmailAuthentication createMemberEmailAuthentication(String email,Integer authenticationNumber) {
        this.setEmail(email);
        this.setAuthenticationNumber(authenticationNumber);
        this.setCreateDate(LocalDateTime.now());

        return this;
    }


}