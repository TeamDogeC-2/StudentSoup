package ProjectDoge.StudentSoup.service.restaurantreview;

import ProjectDoge.StudentSoup.dto.file.UploadFileDto;
import ProjectDoge.StudentSoup.dto.restaurant.RestaurantUpdateDto;
import ProjectDoge.StudentSoup.dto.restaurantreview.RestaurantReviewRequestDto;
import ProjectDoge.StudentSoup.dto.restaurantreview.RestaurantReviewUpdateDto;
import ProjectDoge.StudentSoup.dto.restaurantreview.RestaurantReviewUpdateReqDto;
import ProjectDoge.StudentSoup.entity.file.ImageFile;
import ProjectDoge.StudentSoup.entity.member.MemberClassification;
import ProjectDoge.StudentSoup.entity.restaurant.Restaurant;
import ProjectDoge.StudentSoup.entity.restaurant.RestaurantReview;
import ProjectDoge.StudentSoup.entity.school.School;
import ProjectDoge.StudentSoup.exception.restaurant.RestaurantReviewContentLessThanFiveException;
import ProjectDoge.StudentSoup.exception.restaurant.RestaurantReviewNotOwnException;
import ProjectDoge.StudentSoup.exception.restaurant.RestaurantStarLikedMoreThanFiveException;
import ProjectDoge.StudentSoup.repository.file.FileRepository;
import ProjectDoge.StudentSoup.repository.restaurantreview.RestaurantReviewRepository;
import ProjectDoge.StudentSoup.service.file.FileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class RestaurantReviewUpdateService {

    private final RestaurantReviewRepository restaurantReviewRepository;
    private final RestaurantReviewFindService restaurantReviewFindService;
    private final FileRepository fileRepository;
    private final FileService fileService;

    public RestaurantReviewUpdateDto findUpdateRestaurantReviewForm(Long restaurantReviewId, Long memberId){
        RestaurantReview review = restaurantReviewFindService.findOne(restaurantReviewId);
        checkReviewAuthorization(memberId, review);
        return new RestaurantReviewUpdateDto(review);
    }

    private void checkReviewAuthorization(Long memberId, RestaurantReview review) {
        if(!review.getMember().getMemberId().equals(memberId) && !review.getMember().getMemberClassification().equals(MemberClassification.ADMIN))
            throw new RestaurantReviewNotOwnException("?????? ????????? ???????????? ????????? ???????????????.");
    }

    @Transactional(rollbackFor = Exception.class)
    public Long updateRestaurantReview(Long restaurantReviewId, RestaurantReviewUpdateReqDto dto){
        log.info("????????? ?????? ???????????? ???????????? ?????? ???????????????.");
        RestaurantReview restaurantReview = restaurantReviewFindService.findOne(restaurantReviewId);
        checkReviewDto(dto);
        restaurantReview.updateRestaurantReview(dto);
        List<UploadFileDto> uploadFileDtoList = fileService.createUploadFileDtoList(dto.getMultipartFileList());
        uploadRestaurantReviewImage(restaurantReview, uploadFileDtoList);
        return restaurantReviewId;
    }

    private void checkReviewDto(RestaurantReviewUpdateReqDto dto){
        if(dto.getStarLiked() > 5){
            throw new RestaurantStarLikedMoreThanFiveException("????????? 5?????? ????????? ??? ????????????.");
        } else if(dto.getContent().length() < 5){
            throw new RestaurantReviewContentLessThanFiveException("?????? ?????? ?????? 5?????? ??????????????? ?????????.");
        }
    }

    private void uploadRestaurantReviewImage(RestaurantReview restaurantReview, List<UploadFileDto> uploadFileDtoList) {
        if(!uploadFileDtoList.isEmpty()){
            log.info("????????? ?????? ????????? ??????????????? ?????????????????????.");
            ifPresentImageFileDelete(restaurantReview);
            for(UploadFileDto fileDto : uploadFileDtoList){
                log.info("???????????? ????????? ?????? ?????? : [{}]", fileDto.getOriginalFileName());
                ImageFile imageFile = new ImageFile().createFile(fileDto);
                restaurantReview.addImageFile(fileRepository.save(imageFile));
            }
        }
        log.info("????????? ?????? ????????? ??????????????? ?????????????????????.");
    }

    private void ifPresentImageFileDelete(RestaurantReview restaurantReview) {
        if(!restaurantReview.getImageFileList().isEmpty()){
            log.info("????????? ????????? ???????????? ????????? ????????? ?????????????????????.");
            for(ImageFile image : restaurantReview.getImageFileList()){
                fileService.deleteFile(image);
            }
            fileRepository.deleteAllInBatch(restaurantReview.getImageFileList());
        }
        restaurantReviewRepository.save(restaurantReview);
    }

}
