package ProjectDoge.StudentSoup.repository.member;

import ProjectDoge.StudentSoup.dto.member.MemberSearch;
import ProjectDoge.StudentSoup.entity.member.Member;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import javax.persistence.EntityManager;
import java.util.List;

import static ProjectDoge.StudentSoup.entity.member.QMember.member;

public class MemberRepositoryImpl implements MemberRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public MemberRepositoryImpl(EntityManager em){
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public Member findById(String id) {
        JPQLQuery<Member> query = queryFactory.select(member)
                .from(member)
                .where(member.id.eq(id));

        return query.fetchOne();
    }

    @Override
    public List<Member> findByName(String name) {
        return null;
    }

    @Override
    public List<Member> findByNameAndSchool_SchoolName(String name, String schoolName) {
        return null;
    }

    @Override
    public List<Member> search(MemberSearch memberSearch) {
        return null;
    }

    @Override
    public Member findByNickname(String nickname) {
        JPQLQuery<Member> query = queryFactory.select(member)
                .from(member)
                .where(member.nickname.eq(nickname));

        return query.fetchOne();
    }

    @Override
    public Member findByEmail(String email) {
        JPQLQuery<Member> query = queryFactory.select(member)
                .from(member)
                .where(member.email.eq(email));

        return query.fetchOne();
    }

    @Override
    public Member findByEmailAndId(String email, String id) {
        return null;
    }
}
