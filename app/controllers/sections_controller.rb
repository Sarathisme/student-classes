# frozen_string_literal: true

class SectionsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @sections = Section.all
    @students = nil
    if @sections.size >= 1
      @students = Student.where("section_id = #{@sections.first.id}")
    end
  end

  def items
    @students = Student.where("section_id = #{params[:section_id]}")
    render partial: 'student', object: @students
  end

  def student
    @student = Student.where("id = #{params[:id]}")
    render json: {
      name: @student.first.name,
      email: @student.first.email,
      gpa: @student.first.gpa
    }
  end

  def delete_student
    @student = Student.where("id = #{params[:id]} AND section_id = #{params[:section_id]}")
    if @student.exists?
      begin
        @student.destroy_all
        render json: {
          param: 'success',
          msg: 'Student successfully deleted!'
        }
      rescue StandardError
        render json: {
          param: 'failure',
          msg: 'Cannot destroy student from database!'
        }
      end
    else
      render json: {
        param: 'failure',
        msg: 'Student does not exists!'
      }
    end
  end

  def add_class
    @section = Section.where("name = '#{params[:name]}'")

    begin
      if @section.exists?
        render json: {
          param: 'failure',
          msg: 'Section exists already!'
        }
      else
        @new_section = Section.new(name: params[:name])
        @new_section.save
        render json: {
          param: @new_section.name,
          msg: @new_section.id
        }
      end
    rescue
      render json: {
        param: 'failure',
        msg: 'Server not responding!'
      }
    end
  end

  def delete_class
    @section = Section.where("id = #{params[:id]}")
    @students = Student.where("section_id = #{params[:id]}")

    puts "Here", @section.first.id
    begin
      if @section.exists?
        puts "Students", @students.size, @students.exists?
        if @students.exists?
          @students.destroy_all
        end

        @section.destroy_all

        render json: {
          param: 'success',
          msg: 'Deleted successfully!'
        }
      else
        render json: {
          param: 'failure',
          msg: 'Section does not exist'
        }
      end
    rescue
      render json: {
        param: 'failure',
        msg: 'Server not responding!'
      }
    end
  end

  def edit_class
    @sections = Section.where("name = '#{params[:old]}'")
    if 1 === @sections.size
      begin
        id = @sections.first.id
        @sections.update_all(name: params[:new])

        render json: {
          param: 'success',
          msg: id
        }
      rescue
        render json: {
          param: 'failure',
          msg: 'Server not responding'
        }
      end
    else
      render json: {
        param: 'failure',
        msg: 'More than one exists!'
      }
    end
  end
end
