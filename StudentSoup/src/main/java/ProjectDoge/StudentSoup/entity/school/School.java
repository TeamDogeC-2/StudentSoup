package ProjectDoge.StudentSoup.entity.school;

import ProjectDoge.StudentSoup.dto.school.SchoolFormDto;
import ProjectDoge.StudentSoup.entity.board.Board;
import ProjectDoge.StudentSoup.entity.member.Member;
import ProjectDoge.StudentSoup.entity.restaurant.Restaurant;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "SCHOOL", uniqueConstraints = {@UniqueConstraint(
        name = "SCHOOL_UNIQUE_CONSTRAINT",
        columnNames = {"NAME", "COORDINATE"}
)})
@Getter
@Setter
public class School {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID")
    private Long id;

    @Column(name = "NAME")
    private String schoolName;

    @Column(name = "COORDINATE")
    private String schoolCoordinate;

    @OneToMany(mappedBy = "school")
    private List<Member> members = new ArrayList<>();

    @OneToMany(mappedBy = "school")
    private List<Department> departments = new ArrayList<>();

    @OneToMany(mappedBy = "school")
    private List<Board> boards = new ArrayList<>();

    @OneToMany(mappedBy = "school")
    private List<Restaurant> restaurants = new ArrayList<>();

    //== 생성 메서드 ==//
    public School createTestSchool(){
        this.setSchoolName("우리학교");
        this.setSchoolCoordinate("13.4613,55.7911");

        return this;
    }

    public School createTestSchoolUsingName(String schoolName){
        this.setSchoolName(schoolName);
        this.setSchoolCoordinate("13,46,79");


        return this;
    }
    public School createTestSchool(String schoolName,String SchoolCoordinate){
        this.setSchoolName(schoolName);
        this.setSchoolCoordinate(SchoolCoordinate);
        return this;
    }
    public School createUsingSchoolForm(SchoolFormDto schoolForm){
        this.setSchoolName(schoolForm.getSchoolName());
        this.setSchoolCoordinate(schoolForm.getSchoolCoordinate());
        return this;
    }

}
