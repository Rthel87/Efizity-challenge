class CommentController < ApplicationController
  def create
    comment = Comment.new(comment_params)
    if comment.valid?
      comment.save!
      flash[:info] = "Se ha agregado exitósamente el comentario"
      redirect_to news_url(comment.news_id)
    else
      flash[:error] = "Error. No se ha guardado el comentario. Ingreselo nuevamente."
      redirect_to news_url(comment.news_id)
    end
  end

  private
  def comment_params
    params.require(:comment).permit(:comment, :username, :news_id)
  end
end
