package ProjectDoge.StudentSoup.exhandler.advice;

import ProjectDoge.StudentSoup.exception.restaurant.RestaurantMenuIdNotSentException;
import ProjectDoge.StudentSoup.exception.restaurant.RestaurantReviewIdNotSentException;
import ProjectDoge.StudentSoup.exhandler.ErrorResult;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class RestaurantReviewAdvice {

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(RestaurantReviewIdNotSentException.class)
    public ErrorResult restaurantReviewIdNotSentHandler(RestaurantReviewIdNotSentException e){
        log.error("[exceptionHandle] ex", e);
        return new ErrorResult("RestaurantReviewIdNotSent",e.getMessage());
    }
}
