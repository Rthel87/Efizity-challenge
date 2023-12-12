class CommentController < ApplicationController
  def create
    comment = Comment.new(comment_params)
    if comment.valid?
      comment.save!
      flash[:info] = "Se ha agregado el comentario"
      redirect_to news_url
    else
      flash[:error] = "Error. No se ha guardado el comentario. Ingreselo nuevamente."
      redirect_to news_url
    end
  end

  private
  def comment_params
    params.require(:comment).permit(:comment, :username)
  end
end
